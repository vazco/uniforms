import React          from 'react';
import {connectField} from 'uniforms';

const Text = ({
    disabled,
    id,
    label,
    name,
    onChange,
    placeholder,
    type,
    value,
    ...props
}) =>
    <section {...props}>
        {label && (
            <label htmlFor={id}>
                {label}
            </label>
        )}

        <input
            disabled={disabled}
            id={id}
            name={name}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            type={type || 'text'}
            value={value}
        />
    </section>
;

export default connectField(Text);
