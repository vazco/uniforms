import TextField, { TextFieldProps } from '@mui/material/TextField';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import mergeSlotProps from './mergeSlotProps';

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
  inputRef,
  label,
  max,
  min,
  name,
  onChange,
  readOnly,
  placeholder,
  showInlineError,
  slotProps,
  step = decimal ? 0.01 : 1,
  value,
  ...props
}: NumFieldProps) {
  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth
      helperText={(!!error && showInlineError && errorMessage) || helperText}
      slotProps={{
        ...slotProps,
        htmlInput: mergeSlotProps(
          { min, max, readOnly, step },
          slotProps?.htmlInput,
        ),
      }}
      label={label}
      margin="dense"
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
