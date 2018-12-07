import {createElement} from 'react';

import BaseField from './BaseField';

const identity = x => x;

export default function connectField(
  component,
  {
    baseField = BaseField,
    mapProps = identity,

    ensureValue,
    includeInChain,
    includeParent,
    initialValue
  } = {}
) {
  return class extends baseField {
    static displayName = `${component.displayName || component.name}${baseField.displayName || baseField.name}`;

    constructor() {
      super(...arguments);

      this.options.includeInChain = includeInChain === undefined ? true : includeInChain;
      this.options.initialValue = initialValue === undefined ? true : initialValue;

      if (ensureValue !== undefined) this.options.ensureValue = ensureValue;
      if (includeParent !== undefined) this.options.includeParent = includeParent;
    }

    getChildContextName() {
      return this.options.includeInChain ? super.getChildContextName() : this.context.uniforms.name;
    }

    componentWillMount() {
      if (this.options.initialValue) {
        const props = this.getFieldProps(undefined, {
          ensureValue: false,
          explicitInitialValue: true,
          includeParent: false
        });

        // https://github.com/vazco/uniforms/issues/52
        // If field is initially rendered with value, we treat it as an initial value.
        if (this.props.value !== undefined && this.props.value !== props.value) {
          props.onChange(this.props.value);
          return;
        }

        if (props.required && props.initialValue !== undefined && props.value === undefined) {
          props.onChange(props.initialValue);
        }
      }
    }

    render() {
      return createElement(component, mapProps(this.getFieldProps()));
    }
  };
}
