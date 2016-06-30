/* global Package */

import cloneDeep  from 'lodash.clonedeep';

import Bridge              from './Bridge';
import joinName            from '../helpers/joinName';
import validatorParam      from '../helpers/validatorParam';
//import astronomyDefinition from '../helpers/astronomyDefinition';

let Astro = (typeof global === 'object' ? global : window).Astro;

try {
    if (typeof Package === 'object') {
        if (Astro === undefined) {
            Astro = Package['jagi:astronomy'];
            Astro = Astro.Astro;
        }
    }
} catch (_) {
    // eslint-disable-line
}

export default class AstronomyBridge extends Bridge {
    static check (schema) {
        return Astro && (
            schema &&
            schema.schema &&
            schema.schema.fields &&
            schema.schema.validators
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
            return scopedError.message;
        }

        return '';
    }

    getErrorMessages (error) {
        return (error && error.details || []).map(error => error.message);
    }

    getField (name) {
        let field = this.schema.getField(name);
        if (field) {
            return field;
        }

        throw new Error(`Field not found in schema: '${name}'`);
    }

    getInitialValue (name, props = {}) {
        const field = this.getField(name);

        if (field.constructor.name === 'ListField') {
            const item = this.getInitialValue(joinName(name, '0'));

            const items = Math.max(
                props.initialCount                                    || 0,
                validatorParam(this.schema.schema, name, 'minLength') || 0
            );

            return [...Array(items)].map(() => item);
        }

        const choice = validatorParam(this.schema.schema, name, 'choice');

        const gt = validatorParam(this.schema.schema, name, 'gt')   || Infinity;
        const gte = validatorParam(this.schema.schema, name, 'gte') || Infinity;
        const min = Math.min(gt + 1, gte);

        const lt = validatorParam(this.schema.schema, name, 'lt')   || -Infinity;
        const lte = validatorParam(this.schema.schema, name, 'lte') || -Infinity;
        const max = Math.max(lt - 1, lte);

        return field.default
            ? field.default
            : choice
                ? choice[0]
                : field.type.name === 'Date' || field.type === 'Number'
                    ? min !== Infinity
                        ? min
                        : max !== -Infinity
                            ? max
                            : field.type.name === 'Number'
                                ? 0
                                : new Date()
                    : field.type.class.prototype.constructor.name === 'Class'
                        ? {}
                        : field.type.class();
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

        if (field.constructor.name === 'ListField') {
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
        if (!name) {
            return this.schema.getFieldsNames();
        }
        const field = this.getField(name);
        if (field.type.class.prototype.constructor.name === 'Class') {
            return field.type.class.getFieldsNames();
        }
        return [];
    }

    getType (name) {
        const type = this.getField(name).type['class'];
        return type.prototype.constructor.name === 'Class' ? Object : type;
    }

    getValidator (options = {stopOnFirstError: false}) {
        return model => {
            // eslint-disable-next-line new-cap
            const instance = new this.schema(cloneDeep(model));
            return instance.validate(options);
        };
    }
}

