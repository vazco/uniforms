import Bridge from './Bridge';

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

export default class SimpleSchemaBridge extends Bridge {
    static check (schema) {
        return SimpleSchema && (
            schema &&
            schema.validator &&
            schema.objectKeys &&
            schema.getDefinition &&
            schema.messageForError
        );
    }

    getError (name, error) {
        return (
            error &&
            error.details &&
            error.details.find &&
            error.details.find(error => error.name === name)
        );
    }

    getErrorMessages (error) {
        return (error && error.details || []).map(error => this.schema.messageForError(
            error.type,
            error.name,
            null,
            error.details &&
            error.details.value
        ));
    }

    getField (name) {
        let definition = this.schema.getDefinition(name);
        if (definition) {
            return definition;
        }

        throw new Error(`Field not found in schema: '${name}'`);
    }

    getInitialValue (name) {
        const field = this.getField(name);

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
    }

    getProps (name) {
        let {uniforms, ...field} = this.getField(name);

        field = {...field, required: !field.optional};

        if (uniforms) {
            if (typeof uniforms === 'string' ||
                typeof uniforms === 'function') {
                return {...field, component: uniforms};
            }

            return {...field, ...uniforms};
        }

        return field;
    }

    getSubfields (name) {
        return this.schema.objectKeys(SimpleSchema._makeGeneric(name));
    }

    getType (name) {
        return this.getField(name).type;
    }

    getValidator (options = {clean: true}) {
        return this.schema.validator(options);
    }
}

