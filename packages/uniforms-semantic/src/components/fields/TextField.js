import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const Text = ({
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
    icon,
    iconLeft,
    iconProps,
    id,
    label,
    name,
    onChange,
    parent,       // eslint-disable-line no-unused-vars
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

        <section className={classnames('ui', {left: iconLeft, icon: icon || iconLeft}, 'input')}>

            <input
                disabled={disabled}
                id={id}
                name={name}
                onChange={event => onChange(event.target.value)}
                placeholder={placeholder}
                type={type || 'text'}
                value={value}
            />

            {(icon || iconLeft) && (
                <i className={`${icon || iconLeft} icon`} {...(iconProps || {})} />
            )}
        </section>
    </section>
;

export default connectField(Text);
