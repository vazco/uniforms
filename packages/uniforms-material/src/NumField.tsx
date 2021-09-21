import { useTheme } from '@material-ui/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

export type NumFieldProps = FieldProps<
  number,
  TextFieldProps,
  { decimal?: boolean; max?: number; min?: number; step?: number }
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
  readOnly,
  placeholder,
  showInlineError,
  step = decimal ? 0.01 : 1,
  value,
  ...props
}: NumFieldProps) {
  const theme = useTheme();
  const themeProps = theme.props?.MuiTextField;

  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth={themeProps?.fullWidth ?? true}
      helperText={(error && showInlineError && errorMessage) || helperText}
      inputProps={{
        ...(themeProps?.inputProps ?? {}),
        min,
        max,
        readOnly,
        step,
        ...inputProps,
      }}
      label={label}
      margin={themeProps?.margin ?? 'dense'}
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
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<NumFieldProps>(Num, { kind: 'leaf' });
