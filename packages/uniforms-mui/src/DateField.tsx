import TextField, { TextFieldProps } from '@mui/material/TextField';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import mergeSlotProps from './mergeSlotProps';

type DateFieldType = 'date' | 'datetime-local';

/* istanbul ignore next */
const DateConstructor = (typeof global === 'object' ? global : window).Date;

const dateFormat = (value?: Date, type: DateFieldType = 'datetime-local') =>
  value?.toISOString().slice(0, type === 'datetime-local' ? -8 : -14);

const dateParse = (timestamp: number, onChange: DateFieldProps['onChange']) => {
  const date = new DateConstructor(timestamp);
  if (date.getFullYear() < 10000) {
    onChange(date);
  } else if (isNaN(timestamp)) {
    onChange(undefined);
  }
};

export type DateFieldProps = FieldProps<
  Date,
  TextFieldProps,
  {
    labelProps?: object;
    max?: Date;
    min?: Date;
    type?: 'date' | 'datetime-local';
  }
>;

function Date({
  disabled,
  error,
  errorMessage,
  helperText,
  inputRef,
  label,
  labelProps,
  max,
  min,
  name,
  onChange,
  placeholder,
  readOnly,
  showInlineError,
  slotProps,
  value,
  type = 'datetime-local',
  ...props
}: DateFieldProps) {
  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth
      helperText={(!!error && showInlineError && errorMessage) || helperText}
      label={label}
      slotProps={{
        ...slotProps,
        inputLabel: mergeSlotProps(
          { shrink: true, ...labelProps },
          slotProps?.inputLabel,
        ),
        htmlInput: mergeSlotProps(
          { max: dateFormat(max), min: dateFormat(min), readOnly },
          slotProps?.htmlInput,
        ),
      }}
      margin="dense"
      name={name}
      onChange={event =>
        // FIXME: `valueAsNumber` is not available in `EventTarget`.
        disabled ||
        dateParse((event.target as any).valueAsNumber as number, onChange)
      }
      placeholder={placeholder}
      ref={inputRef}
      type={type}
      value={dateFormat(value, type) ?? ''}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<DateFieldProps>(Date, { kind: 'leaf' });
