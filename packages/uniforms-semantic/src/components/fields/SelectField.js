import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const Select = ({
    allowedValues,
    disabled,
    error,
    id,
    label,
    name,
    onChange,
    placeholder,
    required,
    transform,
    value,
    ...props
}) =>
    <section className={classnames({disabled, error, required}, 'field')}>
        {label && (
            <label htmlFor={id}>
                {label}
            </label>
        )}

        <select
            disabled={disabled}
            id={id}
            name={name}
            onChange={event => onChange(event.target.value)}
            value={value}
            {...props}
        >
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
