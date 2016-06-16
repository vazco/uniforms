import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const Text = ({
    className,
    disabled,
    error,
    id,
    label,
    name,
    onChange,
    placeholder,
    required,
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
            name={name}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            type={typeof type === 'string' ? type : 'text'}
            value={value}
        />
    </section>
;

export default connectField(Text);
