import React          from 'react';
import TextField      from 'material-ui/TextField';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const noneIfNaN = x => isNaN(x) ? undefined : x;

const Num = ({
    decimal,
    disabled,
    error,
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
        errorText={error && showInlineError ? errorMessage : undefined}
        floatingLabelText={label}
        hintText={placeholder}
        id={id}
        max={max}
        min={min}
        name={name}
        onChange={event => onChange(noneIfNaN((decimal ? parseFloat : parseInt)(event.target.value)))}
        ref={inputRef}
        step={decimal ? 0.01 : 1}
        type="number"
        value={value}
        {...filterDOMProps(props)}
    />
;

Num.defaultProps = {fullWidth: true};

export default connectField(Num);
