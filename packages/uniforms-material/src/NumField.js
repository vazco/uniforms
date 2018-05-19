import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import React          from 'react';
import TextField      from '@material-ui/core/TextField';

const Num = ({
    decimal,
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
}) =>
    <TextField
        disabled={disabled}
        error={error}
        helperText={error && showInlineError && errorMessage || helperText}
        label={label}
        name={name}
        onChange={event => disabled || onChange(event.target.value)}
        placeholder={placeholder}
        ref={inputRef}
        step={decimal ? 0.01 : 1}
        value={value}
        type="number"
        {...filterDOMProps(props)}
    />
;

Num.defaultProps = {
    fullWidth: true,
    margin: 'normal'
};

export default connectField(Num);
