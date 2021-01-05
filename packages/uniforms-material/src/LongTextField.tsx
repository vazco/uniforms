import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

export type LongTextFieldProps = FieldProps<string, StandardTextFieldProps>;

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
  showInlineError,
  type = 'text',
  value,
  ...props
}: LongTextFieldProps) => (
  <TextField
    disabled={disabled}
    error={!!error}
    fullWidth
    helperText={(error && showInlineError && errorMessage) || helperText}
    label={label}
    margin="dense"
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

export default connectField(LongText, { kind: 'leaf' });
