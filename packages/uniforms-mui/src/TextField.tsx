import TextField, {
  TextFieldProps as MUITextFieldProps,
} from '@mui/material/TextField';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import mergeSlotProps from './mergeSlotProps';

export type TextFieldProps = FieldProps<string, MUITextFieldProps>;

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
  readOnly,
  showInlineError,
  slotProps,
  type = 'text',
  value = '',
  ...props
}: TextFieldProps) {
  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth
      helperText={(!!error && showInlineError && errorMessage) || helperText}
      slotProps={{
        ...slotProps,
        htmlInput: mergeSlotProps({ readOnly }, slotProps?.htmlInput),
      }}
      label={label}
      margin="dense"
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

export default connectField<TextFieldProps>(Text, { kind: 'leaf' });
