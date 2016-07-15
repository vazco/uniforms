import React          from 'react';
import {connectField} from 'uniforms';

const Bool = ({
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
    inputRef,
    label,
    name,
    onChange,
    parent,       // eslint-disable-line no-unused-vars
    placeholder,  // eslint-disable-line no-unused-vars
    required,     // eslint-disable-line no-unused-vars
    value,
    ...props
}) =>
    <section {...props}>
        <input
            checked={value}
            disabled={disabled}
            id={id}
            name={name}
            onChange={() => disabled || onChange(!value)}
            ref={inputRef}
            type="checkbox"
        />

        {label && (
            <label htmlFor={id}>
                {label}
            </label>
        )}
    </section>
;

export default connectField(Bool);
