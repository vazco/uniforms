import invariant from 'fbjs/lib/invariant';
import joinName  from './joinName';

import Bridge from './Bridge';

let Ajv;
try {
    const r = require; // Silence Meteor missing module warning
    Ajv = r('ajv');
} catch (_) { /* Ignore it. */ }

const SSProperties = ['_cleanOptions','_constructorOptions','_docValidators','messageBox','omit','pick','version'];
const SS2Properties = ['_depsMessages','_messages'];
const SSCommonProperties = [
    '_autoValues',
    '_blackboxKeys',
    '_depsLabels',
    '_firstLevelSchemaKeys',
    '_objectKeys',
    '_schema',
    '_schemaKeys',
    '_validationContexts',
    '_validators'
];

const isSS = schema => [...SSCommonProperties, ...SSProperties].every(property => schema[property]);
const isSS2 = schema => [...SSCommonProperties, ...SS2Properties].every(property => schema[property]);

const resolveRef = (referance, schema) => {
    invariant(
        referance.startsWith('#'),
        'Reference is not an internal reference, and only such are allowed: "%s"',
        referance
    );

    const resolvedReference = referance
        .split('/')
        .filter(part => part && part !== '#')
        .reduce((definition, next) => definition[next], schema);

    invariant(resolvedReference, 'Reference not found in schema: "%s"', referance);

    return resolvedReference;
};

export default class JSONSchemaBridge extends Bridge {
    constructor (schema) {
        super();

        invariant(schema.properties, 'Schema does not contain properties field');

        this.schema = schema;
        this.validator = new Ajv({allErrors: true}).compile(schema);
    }

    static check (schema) {
        return Ajv && schema && new Ajv().validateSchema(schema) && !(isSS(schema) || isSS2(schema));
    }

    getError (/* name, error */) {
        return;
    }

    getErrorMessage (/* name, error */) {
        return;
    }

    getErrorMessages (/* error */) {
        return;
    }

    getField (name) {
        return joinName(null, name).reduce(
            (definition, next) => {
                if (next === '$' || next === '' + parseInt(next, 10)) {
                    invariant(definition.type === 'array', 'Field not found in schema: "%s"', name);
                }


                if (definition[next]) {
                    definition = definition[next];
                } else {
                    const [{properties: combinedDefinition = {}} = {}] =
                        ['allOf', 'anyOf', 'oneOf'].filter(key => definition[key]).map(key =>
                            definition[key].find(({properties = {}}) => properties[next])
                        );

                    definition = combinedDefinition[next];
                }

                invariant(definition, 'Field not found in schema: "%s"', name);

                if (definition.$ref) {
                    definition = resolveRef(definition.$ref, this.schema);
                }

                ['allOf', 'anyOf', 'oneOf'].filter(key => definition[key]).forEach(key => {
                    definition[key] = definition[key].map(def => def.$ref ? resolveRef(def.$ref, this.schema) : def);
                });

                return definition;
            },
            this.schema.properties
        );
    }

    getInitialValue (name) {
        return this.getField(name).default;
    }

    getProps (/* name, props */) {
        return 1;
    }

    getSubfields (name) {
        if (!name) {
            return Object.keys(this.schema.properties);
        }

        const {type: fieldType, properties: fieldProperties} = this.getField(name);

        if (fieldType === 'object') {
            return Object.keys(fieldProperties);
        }

        return [];
    }

    getType (name) {
        const {type: fieldType} = this.getField(name);

        if (fieldType === 'string')                    return String;
        if (fieldType === 'object')                    return Object;
        if (fieldType === 'array')                     return Array;
        if (['number', 'integer'].includes(fieldType)) return Number;

        return fieldType;
    }

    getValidator (/* options */) {
        return this.validator;
    }
}
