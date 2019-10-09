import PropTypes from 'prop-types';
import get from 'lodash/get';
import invariant from 'invariant';
import { Component } from 'react';

import context from './context';
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
  static displayName: string = 'Field';

  static propTypes: any = {
    id: PropTypes.string,

    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,

    label: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.node
    ]),
    placeholder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
  };

  static contextType = context;

  constructor() {
    // @ts-ignore
    super(...arguments);

    invariant(
      this.context && this.context.uniforms,
      '<%s /> must be rendered within a form.',
      // @ts-ignore
      this.constructor.displayName
    );

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

  props: any;

  options: {
    ensureValue: boolean;
    explicitInitialValue?: boolean;
    includeParent?: boolean;
    overrideValue: boolean;
  };

  randomId: number;

  getContext() {
    return {
      uniforms: {
        name: this.getContextName(),
        error: this.getContextError(),
        model: this.getContextModel(),
        state: this.getContextState(),
        schema: this.getContextSchema(),
        onChange: this.getContextOnChange(),
        onSubmit: this.getContextOnSubmit(),
        randomId: this.context.uniforms.randomId
      }
    };
  }

  getContextName() {
    return joinName(null, this.context.uniforms.name, this.props.name);
  }

  getContextError() {
    return this.context.uniforms.error;
  }

  getContextModel() {
    return this.context.uniforms.model;
  }

  getContextState() {
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
      showInlineError: propagate('showInlineError')
    };
  }

  getContextSchema() {
    return this.context.uniforms.schema;
  }

  getContextOnChange() {
    return this.context.uniforms.onChange;
  }

  getContextOnSubmit() {
    return this.context.uniforms.onSubmit;
  }

  // eslint-disable-next-line complexity
  getFieldProps(name?: any, options?: any) {
    const context = this.context.uniforms;
    const props = this.props;
    const state = this.getContextState();

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
            includeParent: false
          })
        : null;
    const [label, none] = flowingProp(
      props.label,
      schemaProps.label,
      state.label,
      ''
    );
    const [placeholder] = flowingProp(
      props.placeholder,
      schemaProps.placeholder,
      state.placeholder,
      label || none
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
      placeholder
    };
  }

  findError(name: any) {
    return this.context.uniforms.schema.getError(
      name,
      this.context.uniforms.error
    );
  }

  findField(name: any) {
    return this.context.uniforms.schema.getField(name);
  }

  findValue(name: any) {
    return get(this.context.uniforms.model, name);
  }
}
