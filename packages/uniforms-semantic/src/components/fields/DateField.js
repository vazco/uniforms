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
    className,
    disabled,
    error,
    id,
    label,
    max,
    min,
    name,
    onChange,
    required,
// type shouldn't be passed to <section>
// eslint-disable-next-line no-unused-vars
    type,
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
