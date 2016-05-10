import React          from 'react';
import {connectField} from 'uniforms';

const Text = ({disabled, label, name, placeholder, value, onChange, ...props}) =>
    <section {...props}>
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
            type="text"
            value={value}
        />
    </section>
;

export default connectField(Text);
