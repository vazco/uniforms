import React, { useEffect } from 'react';
import { connectField, filterDOMProps, useField } from 'uniforms';

const HiddenField = ({ name, ...props }) => {
  [props] = useField(
    name,
    // @ts-ignore
    ...arguments,
  );
  useEffect(() => {
    const { value } = props;
    if (value !== undefined) {
      if (props.value !== value) {
        props.onChange(value);
      }
    }
  });

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
};

export default connectField(HiddenField, {
  ensureValue: false,
  includeInChain: false,
});
