import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connectField, filterDOMProps, Override } from 'uniforms';
import { StandardTextFieldProps } from '@material-ui/core/TextField/TextField';

const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, onChange) => {
  const date = new DateConstructor(timestamp);
  if (date.getFullYear() < 10000) {
    onChange(date);
  } else if (isNaN(timestamp)) {
    onChange(undefined);
  }
};

export type DateFieldProps = Override<
  StandardTextFieldProps,
  {
    errorMessage?: string;
    error?: boolean;
    labelProps?: object;
    showInlineError?: boolean;
  }
>;

const Date = ({
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
}: DateFieldProps) => (
  <TextField
    disabled={!!disabled}
    error={!!error}
    helperText={(error && showInlineError && errorMessage) || helperText}
    label={label}
    InputLabelProps={{ ...labelProps, ...InputLabelProps }}
    name={name}
    margin={props.margin ?? 'dense'}
    onChange={(event: any) =>
      disabled || dateParse(event.target.valueAsNumber, onChange)
    }
    placeholder={placeholder}
    ref={inputRef}
    type="datetime-local"
    value={dateFormat(value) ?? ''}
    {...filterDOMProps(props)}
  />
);

Date.defaultProps = {
  fullWidth: true,
};

export default connectField<DateFieldProps>(Date);
