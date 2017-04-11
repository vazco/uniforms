import React          from 'react';
import TextField      from 'material-ui/TextField';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const Text = ({
    disabled,
    error,
    errorMessage,
    id,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    showInlineError,
    type,
    value,
    ...props
}) =>
    <TextField
        disabled={disabled}
        errorText={error && showInlineError ? errorMessage : undefined}
        floatingLabelText={label}
        hintText={placeholder}
        id={id}
        name={name}
        onChange={(event, value) => onChange(value)}
        ref={inputRef}
        type={type}
        value={value}
        {...filterDOMProps(props)}
    />
;

Text.defaultProps = {
    fullWidth: true,
    type: 'text'
};

export default connectField(Text);
