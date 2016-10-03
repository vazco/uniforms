import invariant from 'invariant';

import Bridge         from './Bridge';
import joinName       from '../helpers/joinName';
import filterDOMProps from '../helpers/filterDOMProps';

let SimpleSchema;
try {
    SimpleSchema = require('simpl-schema').default;
    SimpleSchema.extendOptions(['uniforms']);

    // There's no possibility to retrieve them at runtime
    filterDOMProps.register(
        'allowedValues',
        'autoValue',
        'blackbox',
        'custom',
        'decimal',
        'defaultValue',
        'exclusiveMax',
        'exclusiveMin',
        'label',
        'max',
        'maxCount',
        'min',
        'minCount',
        'optional',
        'regEx',
        'trim',
        'type'
    );
} catch (_) { /* Ignore it. */ }

export default class SimpleSchema2Bridge extends Bridge {
    static check (schema) {
        return SimpleSchema && (
            schema &&
            schema.getDefinition &&
            schema.messageBox &&
            schema.objectKeys &&
            schema.validator &&
            schema.version === 2
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
            return this.schema.messageForError(scopedError);
        }

        return '';
    }

    getErrorMessages (error) {
        if (error) {
            if (Array.isArray(error.details)) {
                return error.details.map(error => this.schema.messageForError(error));
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
        const definition = this.schema.getDefinition(name);

        invariant(definition, 'Field not found in schema: "%s"', name);

        return {...definition, ...definition.type[0]};
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

        if (field.type === Object || SimpleSchema2Bridge.check(field.type)) {
            return {};
        }

        return field.defaultValue;
    }

    // eslint-disable-next-line complexity
    getProps (name, props = {}) {
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
        } else if (type === Number) {
            field = {...field, decimal: true};
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
        // aldeed/node-simple-schema#12
        // return this.schema.objectKeys(name);

        if (!name) {
            return this.schema.objectKeys();
        }

        const type = this.getField(name).type;

        if (SimpleSchema2Bridge.check(type)) {
            return type.objectKeys();
        }

        return this.schema.objectKeys(name);
    }

    getType (name) {
        const type = this.getField(name).type;

        if (type === SimpleSchema.Integer) {
            return Number;
        }

        if (SimpleSchema2Bridge.check(type)) {
            return Object;
        }

        return type;
    }

    getValidator (options = {clean: true}) {
        return this.schema.validator(options);
    }
}
