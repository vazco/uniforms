import React          from 'react';
import {connectField} from 'uniforms';

const LongText = ({
    disabled,
    id,
    label,
    name,
    onChange,
    placeholder,
    value,
    ...props
}) =>
    <section {...props}>
        {label && (
            <label>
                {label}
            </label>
        )}

        <textarea
            disabled={disabled}
            id={id}
            name={name}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            value={value}
        />
    </section>
;

export default connectField(LongText);
