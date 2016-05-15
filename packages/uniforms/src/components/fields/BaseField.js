import get         from 'lodash.get';
import {Component} from 'react';
import {PropTypes} from 'react';

import BaseForm from '../forms/BaseForm';
import joinName from '../../helpers/joinName';

export default class BaseField extends Component {
    constructor () {
        super(...arguments);

        this.getFieldProps = this.getFieldProps.bind(this);

        this.getChildContextName     = this.getChildContextName.bind(this);
        this.getChildContextError    = this.getChildContextError.bind(this);
        this.getChildContextModel    = this.getChildContextModel.bind(this);
        this.getChildContextState    = this.getChildContextState.bind(this);
        this.getChildContextSchema   = this.getChildContextSchema.bind(this);
        this.getChildContextOnChange = this.getChildContextOnChange.bind(this);
    }

    getChildContext () {
        return {
            uniforms: {
                name:     this.getChildContextName(),
                error:    this.getChildContextError(),
                model:    this.getChildContextModel(),
                state:    this.getChildContextState(),
                schema:   this.getChildContextSchema(),
                onChange: this.getChildContextOnChange()
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
            ...{
                label:       propagate('label'),
                disabled:    propagate('disabled'),
                placeholder: propagate('placeholder')
            }
        };
    }

    getChildContextSchema () {
        return this.context.uniforms.schema;
    }

    getChildContextOnChange () {
        return this.context.uniforms.onChange;
    }

    // eslint-disable-next-line complexity
    getFieldProps (name, {explicitDefaultValue = false, includeParent = true} = {}) {
        const costate = this.getChildContextState();
        const context = this.context.uniforms;
        const coprops = {
            label:       costate.label,
            disabled:    costate.disabled,
            placeholder: costate.placeholder,

            ...this.props
        };

        if (name === undefined) {
            name = joinName(context.name, coprops.name);
        }

        const field = {...context.schema.getField(name)};
        const props = {...context.schema.getProps(name), ...coprops};

        const type   = context.schema.getType(name);
        const error  = context.schema.getError(name, context.error);
        const fields = context.schema.getSubfields(name);
        const parent = includeParent && name.indexOf('.') !== -1
            ? this.getFieldProps(name.replace(/(.+)\..+$/, '$1'), {includeParent: false})
            : null;

        const label = props.label
            ? props.label === true
                ? field.label
                : props.label
            : props.label === null
                ? null
                : '';

        const placeholder = props.placeholder
            ? props.placeholder === true
                ? field.label
                : props.placeholder
            : '';

        const defaultValue = context.schema.getDefaultValue(name);

        let value = get(context.model, name);
        if (value === undefined && !explicitDefaultValue) {
            value = defaultValue;
        }

        const onChange = (value, key = name) => context.onChange(key, value);

        return {
            error,
            field,
            fields,
            onChange,
            parent,
            type,
            value,

            ...explicitDefaultValue ? {defaultValue} : {},
            ...props,

            name,
            label,
            placeholder
        };
    }
}

BaseField.propTypes = {
    name:     PropTypes.string,
    disabled: PropTypes.bool,

    label:       PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    placeholder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

BaseField.contextTypes      = BaseForm.childContextTypes;
BaseField.childContextTypes = BaseForm.childContextTypes;
