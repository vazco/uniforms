import React from 'react';
import { BaseField, filterDOMProps, nothing } from 'uniforms';

export default class HiddenField extends BaseField {
  static displayName = 'HiddenField';

  constructor() {
    // @ts-ignore
    super(...arguments);

    this.options = {
      ensureValue: true,
      overrideValue: true,
    };
  }

  componentWillReceiveProps({ value: valueDesired }) {
    if (valueDesired === undefined) {
      return;
    }

    const props = this.getFieldProps();
    if (props.value !== valueDesired) {
      props.onChange(valueDesired);
    }
  }

  render() {
    const props = this.getFieldProps();

    return props.noDOM ? (
      nothing
    ) : (
      <input
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        ref={props.inputRef}
        type="hidden"
        value={props.value}
        {...filterDOMProps(props)}
      />
    );
  }
}
