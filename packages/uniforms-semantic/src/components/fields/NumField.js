import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const Num = ({
    changed,      // eslint-disable-line no-unused-vars
    changedMap,   // eslint-disable-line no-unused-vars
    className,
    decimal,
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
    inputRef,
    label,
    max,
    min,
    name,
    onChange,
    parent,       // eslint-disable-line no-unused-vars
    placeholder,
    required,
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
                max={max}
                min={min}
                name={name}
                onChange={event => onChange((decimal ? parseFloat : parseInt)(event.target.value) || undefined)}
                placeholder={placeholder}
                ref={inputRef}
                step={decimal ? 0.01 : 1}
                type="number"
                value={value === undefined ? null : value}
            />

            {(icon || iconLeft) && (
                <i className={`${icon || iconLeft} icon`} {...iconProps} />
            )}
        </section>
    </section>
;

export default connectField(Num);
