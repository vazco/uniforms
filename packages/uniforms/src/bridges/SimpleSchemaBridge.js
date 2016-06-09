import cloneDeep from 'lodash.clonedeep';

import Bridge   from './Bridge';
import joinName from '../helpers/joinName';

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
            schema.getDefinition &&
            schema.messageForError &&
            schema.objectKeys &&
            schema.validator
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

    getErrorMessage (name, error) {
        let scopedError = this.getError(name, error);
        if (scopedError) {
            return this.schema.messageForError(
                scopedError.type,
                scopedError.name,
                null,
                scopedError.details &&
                scopedError.details.value
            );
        }

        return '';
    }

    getErrorMessages (error) {
        return (error && error.details || []).map(error =>
            this.schema.messageForError(
                error.type,
                error.name,
                null,
                error.details &&
                error.details.value
            )
        );
    }

    getField (name) {
        let definition = this.schema.getDefinition(name);
        if (definition) {
            return definition;
        }

        throw new Error(`Field not found in schema: '${name}'`);
    }

    getInitialValue (name, props = {}) {
        const field = this.getField(name);

        if (field.type === Array) {
            const item = this.getInitialValue(joinName(name, '0'));
            const items = Math.max(
                props.initialCount || 0,
                field.minCount     || 0
            );

            return [...Array(items)].map(() => item);
        }

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

    getProps (name, props) {
        let {optional, uniforms, ...field} = this.getField(name);

        field = {...field, required: !optional};

        if (uniforms) {
            if (typeof uniforms === 'string' ||
                typeof uniforms === 'function') {
                field = {...field, component: uniforms};
            } else {
                field = {...field, ...uniforms};
            }
        }

        let options = props.options || field.options;
        if (options) {
            if (typeof options === 'function') {
                options = options();
            }

            if (!Array.isArray(options)) {
                field = {
                    ...field,
                    transform: value => options[value],
                    allowedValues: Object.keys(options)
                };
            } else {
                field = {
                    ...field,
                    transform: value => options.find(option => option.value === value).label,
                    allowedValues: options.map(options => options.value)
                };
            }
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
        const validator = this.schema.validator(options);
        return model => validator(cloneDeep(model));
    }
}

