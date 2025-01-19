import TextField, { TextFieldProps } from '@mui/material/TextField';
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
  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth
      helperText={(!!error && showInlineError && errorMessage) || helperText}
      inputProps={{ readOnly }}
      label={label}
      margin="dense"
      multiline
      name={name}
      onChange={event =>
        disabled ||
        onChange(event.target.value === '' ? undefined : event.target.value)
      }
      placeholder={placeholder}
      ref={inputRef}
      type={type}
      value={value ?? ''}
      {...filterDOMProps(props)}
    />
  );
};

export default connectField<LongTextFieldProps>(LongText, { kind: 'leaf' });
