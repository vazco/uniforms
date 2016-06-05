import React          from 'react';
import {connectField} from 'uniforms';

const Text = ({
    disabled,
    label,
    name,
    onChange,
    placeholder,
    type = 'text',
    value,
    ...props
}) =>
    <section {...props}>
        {label && (
            <label>
                {label}
            </label>
        )}

        <input
            disabled={disabled}
            name={name}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            type={type}
            value={value}
        />
    </section>
;

export default connectField(Text);
