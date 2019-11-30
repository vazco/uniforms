import React from 'react';
import { BaseField, filterDOMProps } from 'uniforms';

export default class HiddenField extends BaseField {
  static displayName = 'HiddenField';

  constructor() {
    // @ts-ignore
    super(...arguments);

    this.options = {
      ensureValue: true,
      overrideValue: true,
    } as any;
  }

  UNSAFE_componentWillReceiveProps({ value: valueDesired }: any) {
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

    return props.noDOM ? null : (
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
