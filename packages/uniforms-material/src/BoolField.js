import Checkbox       from 'material-ui/Checkbox';
import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

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
    <Checkbox
        checked={!!value}
        disabled={disabled}
        id={id}
        label={label}
        name={name}
        onCheck={(event, value) => disabled || onChange(value)}
        ref={inputRef}
        {...filterDOMProps(props)}
    />
;

export default connectField(Bool);
