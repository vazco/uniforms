import PropTypes from 'prop-types';
import get from 'lodash/get';
import invariant from 'invariant';
import isEqual from 'lodash/isEqual';
import {Component} from 'react';

import BaseForm from './BaseForm';
import joinName from './joinName';

// Used for calculating labels and placeholders.
const flowingProp = (prop, schema, state, fallback) => {
  const propDisabled = prop === '' || prop === false;
  const propSet = prop !== undefined;
  const schemaDisabled = schema === '' || schema === false;
  const schemaValue = schema === true || schema === undefined ? fallback : schema;
  const stateDisabled = !state;

  const value =
    propDisabled || (!propSet && (schemaDisabled || stateDisabled))
      ? ''
      : propSet
      ? prop === true
        ? schemaDisabled
          ? ''
          : schemaValue
        : prop
      : schemaValue;
  return [value, schemaValue];
};

export default class BaseField extends Component {
  static displayName = 'Field';

  static propTypes = {
    id: PropTypes.string,

    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,

    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
    placeholder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
  };

  static contextTypes = BaseForm.childContextTypes;
  static childContextTypes = BaseForm.childContextTypes;

  constructor() {
    super(...arguments);

    invariant(this.context.uniforms, '<%s /> must be rendered within a form.', this.constructor.displayName);

    this.options = {
      ensureValue: true,
      explicitInitialValue: false,
      includeParent: false,
      overrideValue: false
    };

    this.randomId = this.context.uniforms.randomId();

    this.findValue = this.findValue.bind(this);
    this.findField = this.findField.bind(this);
    this.findError = this.findError.bind(this);
  }

  // eslint-disable-next-line complexity
  shouldComponentUpdate(nextProps, _, {uniforms: nextContext}) {
    const prevProps = this.props;
    const prevContext = this.context.uniforms;

    if (!isEqual(prevProps, nextProps)) {
      return true;
    }

    const {changedMap: nextMap, ...nextState} = nextContext.state;
    const {changedMap: prevMap, ...prevState} = prevContext.state;

    if (!isEqual(prevState, nextState)) {
      return true;
    }

    const prevName = joinName(prevContext.name, prevProps.name);
    const nextName = joinName(nextContext.name, nextProps.name);

    if (prevName !== nextName) {
      return true;
    }

    if (!isEqual(get(prevMap, prevName), get(nextMap, nextName))) {
      return true;
    }

    // Fields which are using parent props, need to be updated when parent value change
    if (this.options.includeParent && nextName.indexOf('.') !== -1) {
      const prevParentValue = get(prevContext.model, prevName.replace(/(.+)\..+$/, '$1'));
      const nextParentValue = get(nextContext.model, nextName.replace(/(.+)\..+$/, '$1'));

      if (!isEqual(prevParentValue, nextParentValue)) {
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

      // Fields like List or Nest should update, whenever their children error has changed
      if (nextValue === Object(nextValue) && !(nextValue instanceof Date)) {
        return true;
      }
    }

    if (nextContext.schema !== prevContext.schema) {
      return true;
    }

    return false;
  }

  getChildContext() {
    return {
      uniforms: {
        name: this.getChildContextName(),
        error: this.getChildContextError(),
        model: this.getChildContextModel(),
        state: this.getChildContextState(),
        schema: this.getChildContextSchema(),
        onChange: this.getChildContextOnChange(),
        randomId: this.context.uniforms.randomId
      }
    };
  }

  getChildContextName() {
    return joinName(null, this.context.uniforms.name, this.props.name);
  }

  getChildContextError() {
    return this.context.uniforms.error;
  }

  getChildContextModel() {
    return this.context.uniforms.model;
  }

  getChildContextState() {
    const state = this.context.uniforms.state;
    const props = this.props;

    const propagate = name => (props[name] === undefined || props[name] === null ? state[name] : !!props[name]);

    return {
      ...state,

      label: propagate('label'),
      disabled: propagate('disabled'),
      placeholder: propagate('placeholder'),
      showInlineError: propagate('showInlineError')
    };
  }

  getChildContextSchema() {
    return this.context.uniforms.schema;
  }

  getChildContextOnChange() {
    return this.context.uniforms.onChange;
  }

  // eslint-disable-next-line complexity
  getFieldProps(name, options) {
    const context = this.context.uniforms;
    const props = this.props;
    const state = this.getChildContextState();

    options = Object.assign({}, this.options, options);

    if (name === undefined) {
      name = joinName(context.name, props.name);
    }

    const changed = !!get(context.state.changedMap, name);

    const error = context.schema.getError(name, context.error);
    const errorMessage = context.schema.getErrorMessage(name, context.error);
    const field = context.schema.getField(name);
    const fieldType = context.schema.getType(name);
    const fields = context.schema.getSubfields(name);
    const schemaProps = context.schema.getProps(name, {...state, ...props});

    const initialValue = options.explicitInitialValue ? context.schema.getInitialValue(name, props) : undefined;
    const parent =
      options.includeParent && name.indexOf('.') !== -1
        ? this.getFieldProps(name.replace(/(.+)\..+$/, '$1'), {includeParent: false})
        : null;
    const [label, none] = flowingProp(props.label, schemaProps.label, state.label, '');
    const [placeholder] = flowingProp(props.placeholder, schemaProps.placeholder, state.placeholder, label || none);

    let value;
    if (props.value === undefined || options.overrideValue) {
      value = get(context.model, name);

      if (value === undefined && !changed && !options.explicitInitialValue) {
        value = context.schema.getInitialValue(name, props);
      }
    }

    // This prevents (un)controlled input change warning.
    // More info: https://fb.me/react-controlled-components.
    if (value === undefined && options.ensureValue) {
      value = '';
    }

    return {
      // 0. Constant props.
      findError: this.findError,
      findField: this.findField,
      findValue: this.findValue,
      id: this.randomId,

      // 1. Inherited form state.
      ...state,

      // 2. Calculated field props.
      changed,
      error,
      errorMessage,
      field,
      fieldType,
      fields,
      onChange: (value, key = name) => context.onChange(key, value),
      parent,
      value,

      // 3. Initial value (only if requested).
      ...(options.explicitInitialValue && {initialValue}),

      // 4. Schema props and own props.
      ...schemaProps,
      ...props,

      // 5. Overriden value (only if requested).
      ...((options.explicitInitialValue || options.overrideValue) && {value}),

      // 6. Calculated _special_ field props.
      label,
      name,
      placeholder
    };
  }

  findError(name) {
    return this.context.uniforms.schema.getError(name, this.context.uniforms.error);
  }

  findField(name) {
    return this.context.uniforms.schema.getField(name);
  }

  findValue(name) {
    return get(this.context.uniforms.model, name);
  }
}
