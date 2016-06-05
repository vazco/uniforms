import React          from 'react';
import {connectField} from 'uniforms';

const Text = ({
    type="text",
    disabled,
    label,
    name,
    onChange,
    placeholder,
    value,
    ...props
}) => <section {...props}>
        {label && (
            <label>
                {label}
            </label>
        )}

        <input
            name={name}
            disabled={disabled}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            type={type}
            value={value}
        />
      </section>
;

export default connectField(Text);
