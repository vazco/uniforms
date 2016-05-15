let SimpleSchema = (typeof global === 'object' ? global : window).SimpleSchema;
let Match        = (typeof global === 'object' ? global : window).Match;

try {
    if (Match === undefined) {
        Match = require('meteor/check').Match;
    }

    if (SimpleSchema === undefined) {
        SimpleSchema = require('meteor/aldeed:simple-schema').SimpleSchema;
    }

    SimpleSchema.extendOptions({
        uniforms: Match.Optional(
            Match.OneOf(
                String,
                Function,
                Match.ObjectIncluding({
                    component: Match.Optional(
                        Match.OneOf(
                            String,
                            Function
                        )
                    )
                })
            )
        )
    });
} catch (_) {
    // eslint-disable-line
}

export function makeBridge (schema) {
    return {
        getType:          getType(schema),
        getError:         getError(schema),
        getField:         getField(schema),
        getProps:         getProps(schema),
        getSubfields:     getSubfields(schema),
        getValidator:     getValidator(schema),
        getDefaultValue:  getDefaultValue(schema),
        getErrorMessages: getErrorMessages(schema)
    };
}

export function testSchema (schema) {
    return (
        schema &&
        schema.validator &&
        schema.objectKeys &&
        schema.getDefinition &&
        schema.messageForError
    );
}

const getDefaultValue = (schema) => (name) => {
    const field = getField(schema)(name);

    return field.defaultValue
        ? field.defaultValue
        : field.allowedValues
            ? field.allowedValues[0]
            : field.type === Date || field.type === Number
                ? field.min !== undefined
                    ? field.min
                    : field.max !== undefined
                        ? field.max
                        : field.type === Number
                            ? 0
                            : new Date()
                : field.type();
};

const getError = (/* schema */) => (name, error) => {
    return (
        error &&
        error.details &&
        error.details.find &&
        error.details.find(error => error.name === name)
    );
};

const getErrorMessages = (schema) => (error) => {
    return (error && error.details || []).map(error => schema.messageForError(
        error.type,
        error.name,
        null,
        error.details &&
        error.details.value
    ));
};

const getField = (schema) => (name) => {
    let definition = schema.getDefinition(name);
    if (definition) {
        return definition;
    }

    throw new Error(`Field not found in schema: '${name}'`);
};

const getProps = (schema) => (name) => {
    // defaultValue is passed by getDefaultValue
    // label        is passed by getField
    // eslint-disable-next-line
    let {defaultValue, label, uniforms, ...field} = getField(schema)(name);

    field = {...field, required: !field.optional};

    if (uniforms) {
        if (typeof uniforms === 'string' ||
            typeof uniforms === 'function') {
            return {...field, component: uniforms};
        }

        return {...field, ...uniforms};
    }

    return field;
};

const getSubfields = (schema) => (name) => {
    return schema.objectKeys(SimpleSchema._makeGeneric(name));
};

const getType = (schema) => (name) => {
    return getField(schema)(name).type;
};

const getValidator = (schema) => (options = {clean: true}) => {
    return schema.validator(options);
};
