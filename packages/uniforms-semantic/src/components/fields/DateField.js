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

const Date_ = ({className, disabled, error, field: {max, min, optional}, label, name, value, onChange, ...props}) =>
    <section className={classnames(className, {disabled, error, required: !optional}, 'field')} {...props}>
        {label && (
            <label>
                {label}
            </label>
        )}

        <input
            disabled={disabled}
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
