import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, onChange) => {
    let date = new Date(timestamp);
    if (date.getFullYear() < 10000) {
        onChange(date);
    }
};

const Date_ = ({
    changed,      // eslint-disable-line no-unused-vars
    changedMap,   // eslint-disable-line no-unused-vars
    className,
    disabled,
    error,
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
    placeholder,  // eslint-disable-line no-unused-vars
    required,
    value,
    ...props
}) =>
    <section className={classnames(className, {disabled, error, required}, 'field')} {...props}>
        {label && (
            <label htmlFor={id}>
                {label}
            </label>
        )}

        <input
            disabled={disabled}
            id={id}
            max={dateFormat(max)}
            min={dateFormat(min)}
            name={name}
            onChange={event => dateParse(event.target.valueAsNumber, onChange)}
            type="datetime-local"
            value={dateFormat(value)}
        />
    </section>
;

Date_.displayName = 'Date';

export default connectField(Date_);
