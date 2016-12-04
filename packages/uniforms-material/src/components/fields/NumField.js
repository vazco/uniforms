import React            from 'react';
import TextField        from 'material-ui/TextField';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const noneIfNaN = x => isNaN(x) ? undefined : x;

const Num = ({
    decimal,
    disabled,
    errorMessage,
    id,
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
}) =>
    <TextField
        disabled={disabled}
        errorText={showInlineError ? errorMessage : undefined}
        floatingLabelText={label}
        hintText={placeholder}
        id={id}
        max={max}
        min={min}
        name={name}
        onChange={(event, value) => onChange(noneIfNaN((decimal ? parseFloat : parseInt)(value)))}
        ref={inputRef}
        step={decimal ? 0.01 : 1}
        type="number"
        value={value}
        {...filterDOMProps(props)}
    />
;

export default connectField(Num);
