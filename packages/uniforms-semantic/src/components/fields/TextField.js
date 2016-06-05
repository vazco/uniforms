import React          from 'react';
import classnames     from 'classnames';

const Text = ({
    type="text",
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
}) => <section className={classnames(className, {disabled, error, required}, 'field')} {...props}>
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
            type={type}
            value={value}
        />
      </section>

export default connectField(Text);
