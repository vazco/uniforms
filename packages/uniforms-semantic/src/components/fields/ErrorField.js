import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import {nothing}      from 'uniforms';

const Error = ({
    children,
    changed,      // eslint-disable-line no-unused-vars
    changedMap,   // eslint-disable-line no-unused-vars
    className,
    disabled,     // eslint-disable-line no-unused-vars
    error,        // eslint-disable-line no-unused-vars
    errorMessage,
    field,        // eslint-disable-line no-unused-vars
    fieldType,    // eslint-disable-line no-unused-vars
    fields,       // eslint-disable-line no-unused-vars
    findError,    // eslint-disable-line no-unused-vars
    findField,    // eslint-disable-line no-unused-vars
    findValue,    // eslint-disable-line no-unused-vars
    id,           // eslint-disable-line no-unused-vars
    label,        // eslint-disable-line no-unused-vars
    name,         // eslint-disable-line no-unused-vars
    onChange,     // eslint-disable-line no-unused-vars
    parent,       // eslint-disable-line no-unused-vars
    placeholder,  // eslint-disable-line no-unused-vars
    required,     // eslint-disable-line no-unused-vars
    value,        // eslint-disable-line no-unused-vars
    ...props
}) =>
    !errorMessage ? nothing : (
        <section className={classnames('ui', className, 'error message')} {...props}>
            {children ? (
                children
            ) : (
                <section className="header">
                    {errorMessage}
                </section>
            )}
        </section>
    )
;

export default connectField(Error, {initialValue: false});
