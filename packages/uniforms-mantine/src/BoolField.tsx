import { Checkbox, CheckboxProps } from '@mantine/core';
import React, { Ref } from 'react';
import { connectField, FieldProps, filterDOMProps } from 'uniforms';

export type BoolFieldProps = FieldProps<
  boolean,
  CheckboxProps,
  { inputRef?: Ref<typeof Checkbox | any> }
>;

function Bool({
  disabled,
  inputRef,
  name,
  onChange,
  readOnly,
  value,
  error,
  errorMessage,
  showInlineError,
  ...props
}: BoolFieldProps) {
  return (
    <Checkbox
      checked={value || false}
      disabled={disabled}
      error={showInlineError && !!error && errorMessage}
      name={name}
      onChange={() => (readOnly ? undefined : onChange(!value))}
      ref={inputRef}
      label={props.label}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<BoolFieldProps>(Bool, { kind: 'leaf' });
