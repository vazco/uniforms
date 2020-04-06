import React from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import { connectField, filterDOMProps, Override } from 'uniforms';

export type LongTextFieldProps = Override<
  StandardTextFieldProps,
  {
    errorMessage?: string;
    label: string;
    onChange(value?: string): void;
    showInlineError?: boolean;
    value?: string;
  }
>;

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
  value,
  ...props
}: LongTextFieldProps) => (
  <TextField
    disabled={!!disabled}
    error={!!error}
    helperText={(error && showInlineError && errorMessage) || helperText}
    label={label}
    margin={props.margin ?? 'dense'}
    multiline
    name={name}
    onChange={event => disabled || onChange(event.target.value)}
    placeholder={placeholder}
    ref={inputRef}
    value={value ?? ''}
    {...filterDOMProps(props)}
  />
);

LongText.defaultProps = {
  fullWidth: true,
  type: 'text',
};

export default connectField(LongText);
