import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const Num = ({
    className,
    decimal,
    disabled,
    error,
    label,
    max,
    min,
    name,
    onChange,
    placeholder,
    required,
    value,
    ...props
}) =>
    <section className={classnames(className, {disabled, error, required}, 'field')} {...props}>
        {label && (
            <label>
                {label}
            </label>
        )}

        <input
            disabled={disabled}
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
