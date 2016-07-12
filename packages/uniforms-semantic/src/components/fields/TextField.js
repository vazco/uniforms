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
    <section
        className={classnames(className, {
            ui: icon || iconLeft,
            disabled,
            error,
            required,
            left: iconLeft,
            'icon input': icon || iconLeft
        }, 'field')}
        {...props}
    >
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
            type={type || 'text'}
            value={value}
        />

        {(icon || iconLeft) && (
            <i className={`${icon || iconLeft} icon`} />
        )}
    </section>
;

export default connectField(Text);
