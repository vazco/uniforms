import TextField, { TextFieldProps } from '@mui/material/TextField';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

type DateFieldType = 'date' | 'datetime-local';

/* istanbul ignore next */
const DateConstructor = (typeof global === 'object' ? global : window).Date;

const dateFormat = (
  value?: Date | string,
  type: DateFieldType = 'datetime-local',
) =>
  value
    ? (typeof value === 'string' ? value : value?.toISOString()).slice(
        0,
        type === 'datetime-local' ? -8 : -14,
      )
    : '';

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
    max?: string;
    min?: string;
    labelProps?: object;
    type?: 'date' | 'datetime-local';
  }
>;

function Date({
  disabled,
  error,
  errorMessage,
  helperText,
  InputLabelProps,
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
      InputLabelProps={{ shrink: true, ...labelProps, ...InputLabelProps }}
      inputProps={{
        readOnly,
        min: dateFormat(min),
        max: dateFormat(max),
        ...props.inputProps,
      }}
      margin="dense"
      name={name}
      onChange={event =>
        // FIXME: `valueAsNumber` is not available in `EventTarget`.
        disabled || dateParse((event.target as any).valueAsNumber, onChange)
      }
      placeholder={placeholder}
      ref={inputRef}
      type={type}
      value={dateFormat(value)}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<DateFieldProps>(Date, { kind: 'leaf' });
