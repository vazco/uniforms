import React          from 'react';
import {connectField} from 'uniforms';

const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, onChange) => {
    let date = new Date(timestamp);
    if (date.getFullYear() < 10000) {
        onChange(date);
    }
};

const Date_ = ({
    disabled,
    id,
    label,
    max,
    min,
    name,
    onChange,
// type shouldn't be passed to <section>
// eslint-disable-next-line no-unused-vars
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
