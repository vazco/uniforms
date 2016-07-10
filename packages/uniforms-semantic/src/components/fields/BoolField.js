import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const Bool = ({
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
    id,
    label,
    name,
    onChange,
    parent,       // eslint-disable-line no-unused-vars
    placeholder,  // eslint-disable-line no-unused-vars
    required,
    value,
    ...props
}) =>
    <section className={classnames(className, {disabled, error, required}, 'field')} {...props}>
        <section className="ui checkbox">
            <input
                checked={value}
                className="hidden"
                disabled={disabled}
                id={id}
                name={name}
                onChange={() => onChange(!value)}
                type="checkbox"
            />

            <label htmlFor={id}>
                {label}
            </label>
        </section>
    </section>
;

export default connectField(Bool);
