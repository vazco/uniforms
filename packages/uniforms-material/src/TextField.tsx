import React from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import { connectField, filterDOMProps, Override } from 'uniforms';

export type TextFieldProps = Override<
  StandardTextFieldProps,
  {
    decimal?: boolean;
    errorMessage?: string;
    max?: number;
    min?: number;
    onChange: (value?: string) => void;
    showInlineError?: boolean;
    value?: string;
  }
>;

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
