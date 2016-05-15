import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const Text = ({
    className,
    disabled,
    error,
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

        <input
            disabled={disabled}
            name={name}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            type="text"
            value={value}
        />
    </section>
;

export default connectField(Text);
