import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import React          from 'react';
import TextField      from '@material-ui/core/TextField';

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
    showInlineError,
    value,
    ...props
}) =>
    <TextField
        disabled={disabled}
        error={error}
        helperText={error && showInlineError && errorMessage || helperText}
        label={label}
        multiline
        name={name}
        onChange={event => disabled || onChange(event.target.value)}
        placeholder={placeholder}
        ref={inputRef}
        value={value}
        {...filterDOMProps(props)}
    />
;

LongText.defaultProps = {
    fullWidth: true,
    margin: 'normal',
    type: 'text'
};

export default connectField(LongText);
