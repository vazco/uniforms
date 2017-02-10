import Checkbox       from 'material-ui/Checkbox';
import React          from 'react';
import Toggle         from 'material-ui/Toggle';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const Bool = ({
    appearance = 'checkbox',
    disabled,
    id,
    inputRef,
    label,
    name,
    onChange,
    value,
    ...props
}) =>
    appearance === 'toggle' ? (
        <Toggle
            toggled={!!value}
            disabled={disabled}
            id={id}
            label={label}
            name={name}
            onToggle={(event, value) => disabled || onChange(value)}
            ref={inputRef}{...filterDOMProps(props)}
        />
    ) : (
        <Checkbox
            checked={!!value}
            disabled={disabled}
            id={id}
            label={label}
            name={name}
            onCheck={(event, value) => disabled || onChange(value)}
            ref={inputRef}{...filterDOMProps(props)}
        />
    );

export default connectField(Bool);
