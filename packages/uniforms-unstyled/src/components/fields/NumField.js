import React          from 'react';
import {connectField} from 'uniforms';

const Num = ({
    decimal,
    disabled,
    label,
    max,
    min,
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

        <input
            disabled={disabled}
            max={max}
            min={min}
            name={name}
            onChange={event => onChange((decimal ? parseFloat : parseInt)(event.target.value) || undefined)}
            placeholder={placeholder}
            step={decimal ? 0.01 : 1}
            type="number"
            value={value === undefined ? null : value}
        />
    </section>
;

export default connectField(Num);
