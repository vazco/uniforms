import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const LongText = ({
    className,
    disabled,
    error,
    id,
    label,
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

        <textarea
            disabled={disabled}
            id={id}
            name={name}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            value={value}
        />
    </section>
;

export default connectField(LongText);
