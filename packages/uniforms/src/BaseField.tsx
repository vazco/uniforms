import PropTypes from 'prop-types';
import get from 'lodash/get';
import invariant from 'invariant';
import isEqual from 'lodash/isEqual';
import { Component } from 'react';

import BaseForm from './BaseForm';
import joinName from './joinName';

// Used for calculating labels and placeholders.
const flowingProp = (prop: any, schema: any, state: any, fallback: any) => {
  const propDisabled = prop === '' || prop === false;
  const propSet = prop !== undefined;
  const schemaDisabled = schema === '' || schema === false;
  const schemaValue =
    schema === true || schema === undefined ? fallback : schema;
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

  static propTypes: any = {
    id: PropTypes.string,

    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,

    label: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.node,
    ]),
    placeholder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  };

  static contextTypes = BaseForm.childContextTypes;
  static childContextTypes = BaseForm.childContextTypes;

  constructor() {
    // @ts-ignore
    super(...arguments);

    invariant(
      this.context.uniforms,
      '<%s /> must be rendered within a form.',
      // @ts-ignore
      this.constructor.displayName,
    );

    this.options = {
      ensureValue: true,
      explicitInitialValue: false,
      includeParent: false,
      overrideValue: false,
    };

    this.randomId = this.context.uniforms.randomId();

    this.findValue = this.findValue.bind(this);
    this.findField = this.findField.bind(this);
    this.findError = this.findError.bind(this);
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
        onSubmit: this.getChildContextOnSubmit(),
        randomId: this.context.uniforms.randomId,
      },
    };
  }

  // eslint-disable-next-line complexity
  shouldComponentUpdate(
    nextProps: any,
    _: any,
    { uniforms: nextContext }: { uniforms: any },
  ) {
    const prevProps: any = this.props;
    const prevContext = this.context.uniforms;

    if (!isEqual(prevProps, nextProps)) {
      return true;
    }

    const { changedMap: nextMap, ...nextState } = nextContext.state;
    const { changedMap: prevMap, ...prevState } = prevContext.state;

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
    if (this.options.includeParent && nextName.includes('.')) {
      const prevParentValue = get(
        prevContext.model,
        prevName.replace(/(.+)\..+$/, '$1'),
      );
      const nextParentValue = get(
        nextContext.model,
        nextName.replace(/(.+)\..+$/, '$1'),
      );

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
      const prevError =
        prevContext.error &&
        prevContext.schema.getError(prevName, prevContext.error);
      const nextError =
        nextContext.error &&
        nextContext.schema.getError(nextName, nextContext.error);

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

  props: any;

  options: {
    ensureValue: boolean;
    explicitInitialValue?: boolean;
    includeParent?: boolean;
    overrideValue: boolean;
  };

  randomId: number;

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

    const propagate = (name: any): any =>
      props[name] === undefined || props[name] === null
        ? state[name]
        : !!props[name];

    return {
      ...state,

      label: propagate('label'),
      disabled: propagate('disabled'),
      placeholder: propagate('placeholder'),
      showInlineError: propagate('showInlineError'),
    };
  }

  getChildContextSchema() {
    return this.context.uniforms.schema;
  }

  getChildContextOnChange() {
    return this.context.uniforms.onChange;
  }

  getChildContextOnSubmit() {
    return this.context.uniforms.onSubmit;
  }

  // eslint-disable-next-line complexity
  getFieldProps(name?: any, options?: any) {
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
    const schemaProps = context.schema.getProps(name, { ...state, ...props });

    const initialValue = options.explicitInitialValue
      ? context.schema.getInitialValue(name, props)
      : undefined;
    const parent: any =
      options.includeParent && name.indexOf('.') !== -1
        ? this.getFieldProps(name.replace(/(.+)\..+$/, '$1'), {
            includeParent: false,
          })
        : null;
    const [label, none] = flowingProp(
      props.label,
      schemaProps.label,
      state.label,
      '',
    );
    const [placeholder] = flowingProp(
      props.placeholder,
      schemaProps.placeholder,
      state.placeholder,
      label || none,
    );

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
      onChange: (value: any, key = name) => context.onChange(key, value),
      parent,
      value,

      // 3. Initial value (only if requested).
      ...(options.explicitInitialValue && { initialValue }),

      // 4. Schema props and own props.
      ...schemaProps,
      ...props,

      // 5. Overriden value (only if requested).
      ...((options.explicitInitialValue || options.overrideValue) && { value }),

      // 6. Calculated _special_ field props.
      label,
      name,
      placeholder,
    };
  }

  findError(name: any) {
    return this.context.uniforms.schema.getError(
      name,
      this.context.uniforms.error,
    );
  }

  findField(name: any) {
    return this.context.uniforms.schema.getField(name);
  }

  findValue(name: any) {
    return get(this.context.uniforms.model, name);
  }
}
