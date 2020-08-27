import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

export type TextFieldProps = FieldProps<string, StandardTextFieldProps>;

function Text({
  disabled,
  error,
  errorMessage,
  helperText,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  showInlineError,
  type,
  value,
  ...props
}: TextFieldProps) {
  return (
    <TextField
      disabled={!!disabled}
      error={!!error}
      helperText={(error && showInlineError && errorMessage) || helperText}
      label={label}
      name={name}
      onChange={event => disabled || onChange(event.target.value)}
      placeholder={placeholder}
      ref={inputRef}
      type={type}
      margin={props.margin ?? 'dense'}
      value={value ?? ''}
      {...filterDOMProps(props)}
    />
  );
}

Text.defaultProps = {
  fullWidth: true,
  type: 'text',
};

export default connectField(Text, { kind: 'leaf' });
