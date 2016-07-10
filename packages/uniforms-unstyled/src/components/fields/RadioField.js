import React          from 'react';
import {connectField} from 'uniforms';

const Radio = ({
    allowedValues,
    changed,       // eslint-disable-line no-unused-vars
    changedMap,    // eslint-disable-line no-unused-vars
    checkboxes,    // eslint-disable-line no-unused-vars
    disabled,
    error,         // eslint-disable-line no-unused-vars
    errorMessage,  // eslint-disable-line no-unused-vars
    field,         // eslint-disable-line no-unused-vars
    fieldType,     // eslint-disable-line no-unused-vars
    fields,        // eslint-disable-line no-unused-vars
    findError,     // eslint-disable-line no-unused-vars
    findField,     // eslint-disable-line no-unused-vars
    findValue,     // eslint-disable-line no-unused-vars
    id,
    label,
    name,
    onChange,
    parent,        // eslint-disable-line no-unused-vars
    placeholder,   // eslint-disable-line no-unused-vars
    required,      // eslint-disable-line no-unused-vars
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

        {allowedValues.map(item =>
            <section key={item}>
                <input
                    checked={item === value}
                    disabled={disabled}
                    id={`${id}-${item}`}
                    name={name}
                    onChange={() => onChange(item)}
                    type="radio"
                />

                <label htmlFor={`${id}-${item}`}>
                    {transform ? transform(item) : item}
                </label>
            </section>
        )}
    </section>
;

export default connectField(Radio);
