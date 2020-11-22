import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type NumFieldProps = FieldProps<
  number,
  StandardTextFieldProps,
  { decimal?: boolean; max?: number; min?: number }
>;

function Num({
  decimal,
  disabled,
  error,
  errorMessage,
  fullWidth = true,
  helperText,
  inputProps,
  inputRef,
  label,
  margin = 'dense',
  max,
  min,
  name,
  onChange,
  placeholder,
  showInlineError,
  value,
  ...props
}: NumFieldProps) {
  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth={fullWidth}
      helperText={(error && showInlineError && errorMessage) || helperText}
      inputProps={{ min, max, step: decimal ? 0.01 : 1, ...inputProps }}
      label={label}
      margin={margin}
      name={name}
      onChange={event => {
        const parse = decimal ? parseFloat : parseInt;
        const value = parse(event.target.value);
        onChange(isNaN(value) ? undefined : value);
      }}
      placeholder={placeholder}
      ref={inputRef}
      type="number"
      value={value ?? ''}
      {...wrapField.__filterProps(filterDOMProps(props))}
    />
  );
}

export default connectField(Num, { kind: 'leaf' });
