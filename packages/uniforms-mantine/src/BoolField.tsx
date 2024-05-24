import React, { Ref } from 'react';
import { connectField, filterDOMProps, FieldProps } from 'uniforms';
import { Checkbox, CheckboxProps } from '@mantine/core';

export type BoolFieldProps = FieldProps<
  boolean,
  CheckboxProps,
  { inputRef?: Ref<HTMLInputElement> }
>;

function Bool({
  disabled,
  showInlineError,
  error,
  errorMessage,
  inputRef,
  name,
  onChange,
  readOnly,
  value,
  label,
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
      label={label}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<BoolFieldProps>(Bool, { kind: 'leaf' });
