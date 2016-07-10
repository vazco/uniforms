import React          from 'react';
import {connectField} from 'uniforms';

const Text = ({
    changed,      // eslint-disable-line no-unused-vars
    changedMap,   // eslint-disable-line no-unused-vars
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
    name,
    onChange,
    parent,       // eslint-disable-line no-unused-vars
    placeholder,
    required,     // eslint-disable-line no-unused-vars
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
