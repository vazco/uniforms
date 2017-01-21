import get         from 'lodash.get';
import isEqual     from 'lodash.isequal';
import {Component} from 'react';
import {PropTypes} from 'react';

import BaseForm from './BaseForm';
import joinName from './joinName';

export default class BaseField extends Component {
    static displayName = 'Field';

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

        this.options = {};

        this.randomId = this.context.uniforms.randomId();

        this.findValue = this.findValue.bind(this);
        this.findField = this.findField.bind(this);
        this.findError = this.findError.bind(this);

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

        // TODO: This might be optimized.
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

            // TODO: This is a workaround for List and Nest fields
            //       Those should update, if their child error has changed
            // eslint-disable-next-line max-len
            if (nextValue && typeof nextValue === 'object' && Object.prototype.toString.call(nextValue) !== '[object Date]') {
                return true;
            }
        }

        if (nextContext.schema !== prevContext.schema) {
            return true;
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

            label:           propagate('label'),
            disabled:        propagate('disabled'),
            placeholder:     propagate('placeholder'),
            showInlineError: propagate('showInlineError')
        };
    }

    getChildContextSchema () {
        return this.context.uniforms.schema;
    }

    getChildContextOnChange () {
        return this.context.uniforms.onChange;
    }

    // eslint-disable-next-line complexity
    getFieldProps (name, options) {
        const context = this.context.uniforms;
        const state = this.getChildContextState();
        const props = {...state, ...this.props};

        const {
            ensureValue,
            explicitInitialValue,
            includeParent,
            overrideValue
        } = options ? {...this.options, ...options} : this.options;

        if (name === undefined) {
            name = joinName(context.name, props.name);
        }

        const field       = context.schema.getField(name);
        const fieldType   = context.schema.getType(name);
        const schemaProps = context.schema.getProps(name, props);

        const error  = context.schema.getError(name, context.error);
        const fields = context.schema.getSubfields(name);
        const parent = includeParent && name.indexOf('.') !== -1
            ? this.getFieldProps(name.replace(/(.+)\..+$/, '$1'), {includeParent: false})
            : null;

        const id = props.id || this.randomId;

        const errorMessage = context.schema.getErrorMessage(name, context.error);

        const _lProp           = this.props.label;
        const _lPropDisabled   = _lProp === '' || _lProp === false;
        const _lPropSet        = _lProp !== undefined;
        const _lSchema         = schemaProps.label;
        const _lSchemaDisabled = _lSchema === '' || _lSchema === false;
        const _lSchemaValue    = _lSchema === true || _lSchema === undefined ? '' : _lSchema;
        const _lStateDisabled  = !state.label;

        const label = _lPropDisabled || !_lPropSet && (_lSchemaDisabled || _lStateDisabled)
            ? ''
            : _lPropSet
                ? _lProp === true
                    ? _lSchemaDisabled
                        ? ''
                        : _lSchemaValue
                    : _lProp
                : _lSchemaValue
        ;

        const _pProp           = this.props.placeholder;
        const _pPropDisabled   = _pProp === '' || _pProp === false;
        const _pPropSet        = _pProp !== undefined;
        const _pSchema         = schemaProps.placeholder;
        const _pSchemaDisabled = _pSchema === '' || _pSchema === false;
        const _pSchemaValue    = _pSchema === true || _pSchema === undefined ? label || _lSchemaValue : _pSchema;
        const _pStateDisabled  = !state.placeholder;

        const placeholder = _pPropDisabled || !_pPropSet && (_pSchemaDisabled || _pStateDisabled)
            ? ''
            : _pPropSet
                ? _pProp === true
                    ? _pSchemaDisabled
                        ? ''
                        : _pSchemaValue
                    : _pProp
                : _pSchemaValue
        ;

        const changed = !!get(context.state.changedMap, name);

        let value = get(context.model, name);
        if (value === undefined && !changed && !explicitInitialValue) {
            value = context.schema.getInitialValue(name, this.props);
        } else if (explicitInitialValue) {
            props.initialValue = context.schema.getInitialValue(name, this.props);
        }

        // This prevents (un)controlled input change warning.
        // More info: https://fb.me/react-controlled-components.
        if (value === undefined && ensureValue) {
            value = '';
        }

        const findValue = this.findValue;
        const findField = this.findField;
        const findError = this.findError;

        const onChange = (value, key = name) => context.onChange(key, value);

        return {
            changed,
            error,
            errorMessage,
            field,
            fieldType,
            fields,
            findError,
            findField,
            findValue,
            id,
            onChange,
            parent,

            ...value !== undefined && {value}, // Well, props could have undefined value that
            ...props,                          // override fallback '' - this is a solution for this.

            ...schemaProps,
            ...overrideValue && {value},

            label,
            name,
            placeholder
        };
    }

    findError (name) {
        return this.context.uniforms.schema.getError(name, this.context.uniforms.error);
    }

    findField (name) {
        return this.context.uniforms.schema.getField(name);
    }

    findValue (name) {
        return get(this.context.uniforms.model, name);
    }
}
