import React          from 'react';
import {connectField} from 'uniforms';

const Bool = ({
    disabled,
    id,
    label,
    name,
    onChange,
    value,
    ...props
}) =>
    <section {...props}>
        <input
            checked={value}
            disabled={disabled}
            id={id}
            name={name}
            onChange={() => disabled || onChange(!value)}
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
