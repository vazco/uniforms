import get         from 'lodash.get';
import isEqual     from 'lodash.isequal';
import {Component} from 'react';
import {PropTypes} from 'react';

import BaseForm from '../forms/BaseForm';
import joinName from '../../helpers/joinName';

export default class BaseField extends Component {
    static propTypes = {
        id: PropTypes.string,

        name:     PropTypes.string,
        disabled: PropTypes.bool,

        label:       PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
        placeholder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    };

    static contextTypes      = BaseForm.childContextTypes;
    static childContextTypes = BaseForm.childContextTypes;

    constructor () {
        super(...arguments);

        this.randomId = this.context.uniforms.randomId();

        this.getFieldProps = this.getFieldProps.bind(this);

        this.getChildContextName     = this.getChildContextName.bind(this);
        this.getChildContextError    = this.getChildContextError.bind(this);
        this.getChildContextModel    = this.getChildContextModel.bind(this);
        this.getChildContextState    = this.getChildContextState.bind(this);
        this.getChildContextSchema   = this.getChildContextSchema.bind(this);
        this.getChildContextOnChange = this.getChildContextOnChange.bind(this);
    }

    shouldComponentUpdate (nextProps, nextState, {uniforms: nextContext}) {
        const prevProps   = this.props;
        const prevContext = this.context.uniforms;

        if (!isEqual(prevProps, nextProps)) {
            return true;
        }

        const prevName = joinName(prevContext.name, prevProps.name);
        const nextName = joinName(nextContext.name, nextProps.name);

        if (prevName !== nextName) {
            return true;
        }

        if (nextName.indexOf('.') !== -1) {
            const prevParentValue = get(prevContext.model, prevName.replace(/(.+)\..+$/, '$1'));
            const nextParentValue = get(nextContext.model, nextName.replace(/(.+)\..+$/, '$1'));

            if (Array.isArray(nextParentValue) && !isEqual(prevParentValue, nextParentValue)) {
                return true;
            }
        }

        const prevValue = get(prevContext.model, prevName);
        const nextValue = get(nextContext.model, nextName);

        if (!isEqual(prevValue, nextValue)) {
            return true;
        }

        if (prevContext.error !== nextContext.error) {
            const prevError = prevContext.error && prevContext.schema.getError(prevName, prevContext.error);
            const nextError = nextContext.error && nextContext.schema.getError(nextName, nextContext.error);

            if (!isEqual(prevError, nextError)) {
                return true;
            }
        }

        return false;
    }

    getChildContext () {
        return {
            uniforms: {
                name:     this.getChildContextName(),
                error:    this.getChildContextError(),
                model:    this.getChildContextModel(),
                state:    this.getChildContextState(),
                schema:   this.getChildContextSchema(),
                onChange: this.getChildContextOnChange(),
                randomId: this.context.uniforms.randomId
            }
        };
    }

    getChildContextName () {
        return joinName(null, this.context.uniforms.name, this.props.name);
    }

    getChildContextError () {
        return this.context.uniforms.error;
    }

    getChildContextModel () {
        return this.context.uniforms.model;
    }

    getChildContextState () {
        const state = this.context.uniforms.state;
        const props = this.props;

        const propagate = name => props[name] === undefined || props[name] === null ? state[name] : !!props[name];

        return {
            ...state,

            label:       propagate('label'),
            disabled:    propagate('disabled'),
            placeholder: propagate('placeholder')
        };
    }

    getChildContextSchema () {
        return this.context.uniforms.schema;
    }

    getChildContextOnChange () {
        return this.context.uniforms.onChange;
    }

    // eslint-disable-next-line complexity, max-len
    getFieldProps (name, {explicitInitialValue = false, overrideValue = false, includeParent = false, onlyDescriptor = false} = {}) {
        const context = this.context.uniforms;

        if (onlyDescriptor) {
            const props = this.props;
            const name = joinName(context.name, this.props.name);
            const schemaProps = context.schema.getProps(name, props);

            return {
                fieldType: context.schema.getType(name),

                ...props,
                ...schemaProps
            };
        }

        const props = {
            ...this.getChildContextState(),
            ...this.props
        };

        if (name === undefined) {
            name = joinName(context.name, props.name);
        }

        const field = context.schema.getField(name);
        const fieldType = context.schema.getType(name);
        const schemaProps = context.schema.getProps(name, props);

        const error  = context.schema.getError(name, context.error);
        const fields = context.schema.getSubfields(name);
        const parent = includeParent && name.indexOf('.') !== -1
            ? this.getFieldProps(name.replace(/(.+)\..+$/, '$1'), {includeParent: false})
            : null;

        const id = props.id || this.randomId;

        const errorMessage = context.schema.getErrorMessage(name, context.error);

        const label = props.label
            ? props.label === true
                ? schemaProps.label
                : props.label
            : props.label === null
                ? null
                : '';

        const placeholder = props.placeholder
            ? props.placeholder === true
                ? schemaProps.label
                : props.placeholder
            : '';

        const changed = !!get(context.state.changedMap, name);

        let value = get(context.model, name);
        if (value === undefined && !explicitInitialValue) {
            value = context.schema.getInitialValue(name, this.props);

            // This prevents (un)controlled input change warning.
            // More info: https://fb.me/react-controlled-components.
            if (value === undefined) {
                value = '';
            }
        } else if (explicitInitialValue) {
            props.initialValue = context.schema.getInitialValue(name, this.props);
        }

        const findValue = name => get(context.model, name);
        const findField = name => context.schema.getField(name);
        const findError = name => context.schema.getError(name, context.error);

        const onChange = (value, key = name) => context.onChange(key, value);

        return {
            changed,
            error,
            errorMessage,
            field,
            fields,
            fieldType,
            findError,
            findField,
            findValue,
            id,
            onChange,
            parent,
            value,

            ...props,
            ...schemaProps,
            ...overrideValue ? {value} : {},

            label,
            name,
            placeholder
        };
    }
}
