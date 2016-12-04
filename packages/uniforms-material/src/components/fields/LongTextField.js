import React            from 'react';
import TextField        from 'material-ui/TextField';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const Text = ({
    disabled,
    id,
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
        errorText={errorMessage}
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

export default connectField(Text);
