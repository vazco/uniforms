import React from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import { connectField, filterDOMProps } from 'uniforms';

type TextFieldProps = {
  decimal?: boolean;
  errorMessage?: string;
  max?: number;
  min?: number;
  showInlineError?: boolean;
  onChange: (value?: string) => void;
  value?: string;
} & StandardTextFieldProps;

const Text = ({
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
}: TextFieldProps) => (
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

Text.defaultProps = {
  fullWidth: true,
  type: 'text',
};

export default connectField<TextFieldProps>(Text);
