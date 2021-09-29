import { useTheme } from '@material-ui/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

export type LongTextFieldProps = FieldProps<string, TextFieldProps>;

const LongText = ({
  disabled,
  error,
  errorMessage,
  helperText,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  showInlineError,
  type = 'text',
  value,
  ...props
}: LongTextFieldProps) => {
  const theme = useTheme();
  const themeProps = theme.props?.MuiTextField;

  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth={themeProps?.fullWidth ?? true}
      helperText={(error && showInlineError && errorMessage) || helperText}
      inputProps={{ ...themeProps?.inputProps, readOnly }}
      label={label}
      margin={themeProps?.margin ?? 'dense'}
      multiline
      name={name}
      onChange={event => disabled || onChange(event.target.value)}
      placeholder={placeholder}
      ref={inputRef}
      type={type}
      value={value ?? ''}
      {...filterDOMProps(props)}
    />
  );
};

export default connectField<LongTextFieldProps>(LongText, { kind: 'leaf' });
