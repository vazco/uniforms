import React            from 'react';
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
    <section {...filterDOMProps(props)}>
        <input
            checked={value}
            disabled={disabled}
            id={id}
            name={name}
            onChange={() => disabled || onChange(!value)}
            ref={inputRef}
            type="checkbox"
        />

        {label && (
            <label htmlFor={id}>
                {label}
            </label>
        )}
    </section>
;

export default connectField(Bool);
