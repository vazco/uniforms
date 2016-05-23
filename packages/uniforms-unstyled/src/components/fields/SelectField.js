import React          from 'react';
import {connectField} from 'uniforms';

const Select = ({
    allowedValues,
    disabled,
    label,
    name,
    onChange,
    placeholder,
    transform,
    value,
    ...props
}) =>
    <section {...props}>
        {label && (
            <label>
                {label}
            </label>
        )}

        <select disabled={disabled} name={name} value={value} onChange={event => onChange(event.target.value)}>
            {placeholder && (
                <option value="" disabled hidden>
                    {placeholder}
                </option>
            )}

            {allowedValues.map(value =>
                <option key={value} value={value}>
                    {transform ? transform(value) : value}
                </option>
            )}
        </select>
    </section>
;

export default connectField(Select);
