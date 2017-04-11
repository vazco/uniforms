import React          from 'react';
import TextField      from 'material-ui/TextField';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const LongText = ({
    disabled,
    id,
    error,
    errorMessage,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    value,
    ...props
}) =>
    <TextField
        disabled={disabled}
        errorText={error && showInlineError ? errorMessage : undefined}
        floatingLabelText={label}
        id={id}
        multiLine
        name={name}
        onChange={(event, value) => onChange(value)}
        placeholder={placeholder}
        ref={inputRef}
        value={value}
        {...filterDOMProps(props)}
    />
;

LongText.defaultProps = {fullWidth: true};

export default connectField(LongText);
