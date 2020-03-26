import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connectField, filterDOMProps } from 'uniforms';
import { StandardTextFieldProps } from '@material-ui/core/TextField/TextField';

type NumFieldProps = {
  decimal?: boolean;
  errorMessage?: string;
  max?: number;
  min?: number;
  showInlineError?: boolean;
  onChange: (value?: number) => void;
  value?: number;
} & StandardTextFieldProps;

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
}: NumFieldProps) => (
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
    margin={props.margin ?? 'dense'}
    fullWidth={props.fullWidth ?? true}
    value={value ?? ''}
    {...filterDOMProps(props)}
  />
);

export default connectField<NumFieldProps>(Num);
