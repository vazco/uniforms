import React from 'react';
import identity from 'lodash/identity';

import BaseField from './BaseField';
import context from './context';

const getDisplayName = (component: React.ComponentType) =>
  component.displayName || component.name;

export default function connectField(
  Component: React.ComponentType<any>,
  {
    baseField = BaseField,
    mapProps = identity,

    ensureValue,
    includeInChain,
    includeParent,
    initialValue,
  }: any = {},
): any {
  return class extends baseField {
    static displayName = getDisplayName(Component) + getDisplayName(baseField);

    constructor() {
      // @ts-ignore
      super(...arguments);

      this.options.includeInChain =
        includeInChain === undefined ? true : includeInChain;
      this.options.initialValue =
        initialValue === undefined ? true : initialValue;
      if (ensureValue !== undefined) this.options.ensureValue = ensureValue;
      if (includeParent !== undefined)
        this.options.includeParent = includeParent;
    }

    getContextName() {
      return this.options.includeInChain
        ? super.getContextName()
        : this.context.uniforms.name;
    }

    componentDidMount() {
      if (this.options.initialValue) {
        const props = this.getFieldProps(undefined, {
          ensureValue: false,
          explicitInitialValue: true,
          includeParent: false,
        });
        // https://github.com/vazco/uniforms/issues/52
        // If field is initially rendered with value, we treat it as an initial value.
        if (
          this.props.value !== undefined &&
          this.props.value !== props.value
        ) {
          props.onChange(this.props.value);
          return;
        }
        if (
          props.required &&
          props.initialValue !== undefined &&
          props.value === undefined
        ) {
          props.onChange(props.initialValue);
        }
      }
    }

    render() {
      return (
        <context.Provider value={this.getContext()}>
          <Component {...mapProps(this.getFieldProps())} />
        </context.Provider>
      );
    }
  };
}
