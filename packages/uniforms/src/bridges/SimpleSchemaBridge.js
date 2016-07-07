/* global Package */

import cloneDeep from 'lodash.clonedeep';

import Bridge   from './Bridge';
import joinName from '../helpers/joinName';

let Match        = (typeof global === 'object' ? global : window).Match;
let SimpleSchema = (typeof global === 'object' ? global : window).SimpleSchema;

try {
    if (typeof Package === 'object') {
        if (Match === undefined) {
            Match = Package['check'];
            Match = Match.Match;
        }

        if (SimpleSchema === undefined) {
            SimpleSchema = Package['aldeed:simple-schema'];
            SimpleSchema = SimpleSchema.SimpleSchema;
        }
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
} catch (_) { /* Ignore it. */ }

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
        if (error) {
            if (Array.isArray(error.details)) {
                return error.details.map(error =>
                    this.schema.messageForError(
                        error.type,
                        error.name,
                        null,
                        error.details &&
                        error.details.value
                    )
                );
            }

            if (error.message) {
                return [error.message];
            }
        }

        if (error !== undefined) {
            return [error];
        }

        return [];
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

        if (field.type === Object) {
            return {};
        }

        return field.defaultValue;
    }

    getProps (name, props) {
        // Type should be omitted.
        // eslint-disable-next-line no-unused-vars
        let {optional, type, uniforms, ...field} = this.getField(name);

        field = {...field, required: !optional};

        if (uniforms) {
            if (typeof uniforms === 'string' ||
                typeof uniforms === 'function') {
                field = {...field, component: uniforms};
            } else {
                field = {...field, ...uniforms};
            }
        }

        if (type === Array) {
            try {
                let itemProps = this.getProps(`${name}.$`, props);
                if (itemProps.allowedValues && !props.allowedValues) {
                    field.allowedValues = itemProps.allowedValues;
                }

                if (itemProps.transform && !props.transform) {
                    field.transform = itemProps.transform;
                }
            } catch (e) { /* do nothing */ }
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
        return model => validator(cloneDeep({...model}));
    }
}

