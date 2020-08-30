import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

export type TextFieldProps = FieldProps<string, StandardTextFieldProps>;

function Text({
  disabled,
  error,
  errorMessage,
  fullWidth = true,
  helperText,
  inputRef,
  label,
  margin = 'dense',
  name,
  onChange,
  placeholder,
  showInlineError,
  type = 'text',
  value = '',
  ...props
}: TextFieldProps) {
  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth={fullWidth}
      helperText={(error && showInlineError && errorMessage) || helperText}
      label={label}
      margin={margin}
      name={name}
      onChange={event => disabled || onChange(event.target.value)}
      placeholder={placeholder}
      ref={inputRef}
      type={type}
      value={value}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField(Text, { kind: 'leaf' });
