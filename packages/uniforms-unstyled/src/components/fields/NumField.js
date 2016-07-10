import React          from 'react';
import {connectField} from 'uniforms';

const Num = ({
    changed,      // eslint-disable-line no-unused-vars
    changedMap,   // eslint-disable-line no-unused-vars
    decimal,
    disabled,
    error,        // eslint-disable-line no-unused-vars
    errorMessage, // eslint-disable-line no-unused-vars
    field,        // eslint-disable-line no-unused-vars
    fieldType,    // eslint-disable-line no-unused-vars
    fields,       // eslint-disable-line no-unused-vars
    findError,    // eslint-disable-line no-unused-vars
    findField,    // eslint-disable-line no-unused-vars
    findValue,    // eslint-disable-line no-unused-vars
    id,
    label,
    max,
    min,
    name,
    onChange,
    parent,       // eslint-disable-line no-unused-vars
    placeholder,
    required,     // eslint-disable-line no-unused-vars
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
