import invariant from 'fbjs/lib/invariant';
import joinName  from './joinName';

import Bridge from './Bridge';

let Ajv;
try {
    const r = require; // Silence Meteor missing module warning
    Ajv = r('ajv');
} catch (_) { /* Ignore it. */ }

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
        return schema && Ajv && new Ajv().validateSchema(schema);
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
            (definition, next) => { // eslint-disable-line complexity
                if (next === '$' || next === '' + parseInt(next, 10)) {
                    invariant(definition.type === 'array', 'Field not found in schema: "%s"', name);
                    definition = Array.isArray(definition.items)
                        ? definition.items[parseInt(next, 10)]
                        : definition.items;
                } else if (definition[next]) {
                    definition = definition[next];
                } else if (definition.type === 'object') {
                    definition = definition.properties[next];
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

                if (['allOf', 'anyOf', 'oneOf'].filter(key => definition[key]).length) {
                    // Naive computation of combined type and properties
                    definition._type = (
                        [].concat(
                            definition.allOf || [],
                            definition.anyOf || [],
                            definition.oneOf || []
                        ).find(def => def.type) || {}
                    ).type;
                    definition._properties = [].concat(
                        definition.allOf || [],
                        definition.anyOf || [],
                        definition.oneOf || []
                    ).reduce((_properties, {properties}) => Object.assign(_properties, properties), {});
                }

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

        const {
            _type,
            type: fieldType = _type,
            _properties,
            properties: fieldProperties = _properties
        } = this.getField(name);

        if (fieldType === 'object') {
            return Object.keys(fieldProperties);
        }

        return [];
    }

    getType (name) {
        const {
            _type,
            type: fieldType = _type,
            format: fieldFormat
        } = this.getField(name);

        if (fieldFormat === 'date-time')               return Date;
        if (fieldType === 'string')                    return String;
        if (['number', 'integer'].includes(fieldType)) return Number;
        if (fieldType === 'object')                    return Object;
        if (fieldType === 'array')                     return Array;
        if (fieldType === 'boolean')                   return Boolean;

        invariant(fieldType === 'null', 'Type null can not be represented as a field: "%s"', name);

        return fieldType;
    }

    getValidator (/* options */) {
        return this.validator;
    }
}
