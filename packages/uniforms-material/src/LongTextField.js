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
    showInlineError,
    value,
    ...props
}) =>
    <TextField
        disabled={disabled}
        errorText={error && showInlineError ? errorMessage : undefined}
        floatingLabelText={label}
        hintText={placeholder}
        id={id}
        multiLine
        name={name}
        onChange={(event, value) => onChange(value)}
        ref={inputRef}
        value={value}
        {...filterDOMProps(props)}
    />
;

LongText.defaultProps = {fullWidth: true};

export default connectField(LongText);
