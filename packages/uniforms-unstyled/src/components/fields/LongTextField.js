import React          from 'react';
import {connectField} from 'uniforms';

const LongText = ({disabled, label, name, placeholder, value, onChange, ...props}) =>
    <section {...props}>
        {label && (
            <label>
                {label}
            </label>
        )}

        <textarea
            disabled={disabled}
            name={name}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            type="text"
            value={value}
        />
    </section>
;

export default connectField(LongText);
