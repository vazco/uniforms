import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = (value?: Date) => value && value.toISOString().slice(0, -8);
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
  StandardTextFieldProps,
  { labelProps?: object }
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
  name,
  onChange,
  placeholder,
  showInlineError,
  value,
  ...props
}: DateFieldProps) {
  return (
    <TextField
      disabled={!!disabled}
      error={!!error}
      helperText={(error && showInlineError && errorMessage) || helperText}
      label={label}
      InputLabelProps={{ ...labelProps, ...InputLabelProps }}
      name={name}
      margin={props.margin ?? 'dense'}
      onChange={event =>
        // FIXME: `valueAsNumber` is not available in `EventTarget`.
        disabled || dateParse((event.target as any).valueAsNumber, onChange)
      }
      placeholder={placeholder}
      ref={inputRef}
      type="datetime-local"
      value={dateFormat(value) ?? ''}
      {...filterDOMProps(props)}
    />
  );
}

Date.defaultProps = {
  fullWidth: true,
};

export default connectField(Date, { kind: 'leaf' });
