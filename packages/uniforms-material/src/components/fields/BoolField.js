import React            from 'react';
import Toggle           from 'material-ui/Toggle';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const Bool = ({
    disabled,
    id,
    inputRef,
    label,
    name,
    onChange,
    value,
    ...props
}) =>
    <Toggle
        disabled={disabled}
        id={id}
        label={label}
        name={name}
        onToggle={(event, value) => disabled || onChange(value)}
        ref={inputRef}
        toggled={!!value}
        {...filterDOMProps(props)}
    />
;

export default connectField(Bool);
