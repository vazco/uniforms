import React from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

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
  helperText,
  inputProps,
  inputRef,
  label,
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
      disabled={!!disabled}
      error={!!error}
      helperText={(error && showInlineError && errorMessage) || helperText}
      inputProps={{ min, max, step: decimal ? 0.01 : 1, ...inputProps }}
      label={label}
      name={name}
      onChange={event => {
        const parse = decimal ? parseFloat : parseInt;
        const value = parse(event.target.value);
        onChange(isNaN(value) ? undefined : value);
      }}
      placeholder={placeholder}
      ref={inputRef}
      type="number"
      margin={props.margin ?? 'dense'}
      fullWidth={props.fullWidth ?? true}
      value={value ?? ''}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField(Num, { kind: 'leaf' });
