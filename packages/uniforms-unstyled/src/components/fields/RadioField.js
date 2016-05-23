import React          from 'react';
import {connectField} from 'uniforms';

const Radio = ({
    allowedValues,
    disabled,
    label,
    name,
    onChange,
    value,
    ...props
}) =>
    <section {...props}>
        {label && (
            <label>
                {label}
            </label>
        )}

        {allowedValues.map(item =>
            <section key={item}>
                <input
                    checked={item === value}
                    disabled={disabled}
                    name={name}
                    onChange={() => onChange(item)}
                    type="radio"
                />
                <label>
                    {item}
                </label>
            </section>
        )}
    </section>
;

export default connectField(Radio);
