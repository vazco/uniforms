import invariant from 'fbjs/lib/invariant';

import Bridge from './Bridge';

let Ajv;
try {
    const r = require; // Silence Meteor missing module warning
    Ajv = r('ajv');
} catch (_) { /* Ignore it. */ }

const isSS = schema => ['pick', 'omit', '_constructorOptions', '_validators', '_docValidators', '_validationContexts', '_cleanOptions', '_schema', '_schemaKeys', '_autoValues', '_blackboxKeys', '_firstLevelSchemaKeys', '_depsLabels', '_objectKeys', 'messageBox', 'version'].every(property => schema[property]);
const isSS2 = schema => ['_schema', '_schemaKeys', '_autoValues', '_blackboxKeys', '_validators', '_messages', '_depsMessages', '_depsLabels', '_firstLevelSchemaKeys', '_objectKeys', '_validationContexts'].every(property => schema[property]);

export default class JSONSchemaBridge extends Bridge {
    constructor (schema) {
        super();

        this.schema = schema;
        this.validator = new Ajv({allErrors: true}).compile(schema);
    }

    static check (schema) {
        return Ajv && new Ajv().validateSchema(schema) && (schema.$schema || !isSS(schema) && !isSS2(schema));
    }

    getError (/* name, error */) {
        return 1;
    }

    getErrorMessage (/* name, error */) {
        return 1;
    }

    getErrorMessages (/* error */) {
        return 1;
    }

    getField (name) {
        return 1;
    }

    getInitialValue (name) {
        return this.getField(name).default;
    }

    getProps (/* name, props */) {
        return 1;
    }

    getSubfields (/* name */) {
        return 1;
    }

    getType (name) {
        const fieldType = this.getField(name).type;

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
