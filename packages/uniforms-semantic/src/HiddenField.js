import BaseField from 'uniforms/BaseField';
import React from 'react';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing from 'uniforms/nothing';

export default class HiddenField extends BaseField {
  static displayName = 'HiddenField';

  constructor() {
    super(...arguments);

    this.options = {
      ensureValue: true,
      overrideValue: true
    };
  }

  componentWillReceiveProps({value: valueDesired}) {
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
