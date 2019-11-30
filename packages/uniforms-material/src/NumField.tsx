import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { connectField, filterDOMProps } from 'uniforms';

const Num = ({
  decimal,
  disabled,
  error,
  errorMessage,
  helperText,
  inputProps,
  inputRef,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  showInlineError,
  value,
  ...props
}) => (
  <TextField
    disabled={!!disabled}
    error={!!error}
    helperText={(error && showInlineError && errorMessage) || helperText}
    inputProps={{ min, max, step: decimal ? 0.01 : 1, ...inputProps }}
    label={label}
    name={name}
    onChange={event => {
      const parse = decimal ? parseFloat : parseInt;
      const value = parse(event.target.value);
      onChange(isNaN(value) ? undefined : value);
    }}
    placeholder={placeholder}
    ref={inputRef}
    type="number"
    value={value}
    {...filterDOMProps(props)}
  />
);

Num.defaultProps = {
  fullWidth: true,
  margin: 'dense',
};

export default connectField(Num);
