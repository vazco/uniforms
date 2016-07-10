import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import {injectName}   from 'uniforms';
import {joinName}     from 'uniforms';

import AutoField from './AutoField';

const Nest = ({
    changed,      // eslint-disable-line no-unused-vars
    changedMap,   // eslint-disable-line no-unused-vars
    children,
    className,
    disabled,
    error,
    errorMessage, // eslint-disable-line no-unused-vars
    field,        // eslint-disable-line no-unused-vars
    fieldType,    // eslint-disable-line no-unused-vars
    fields,
    findError,    // eslint-disable-line no-unused-vars
    findField,    // eslint-disable-line no-unused-vars
    findValue,    // eslint-disable-line no-unused-vars
    id,           // eslint-disable-line no-unused-vars
    label,
    name,
    onChange,     // eslint-disable-line no-unused-vars
    parent,       // eslint-disable-line no-unused-vars
    placeholder,  // eslint-disable-line no-unused-vars
    required,     // eslint-disable-line no-unused-vars
    value,        // eslint-disable-line no-unused-vars
    ...props
}) =>
    <section className={classnames(className, {disabled, error}, 'grouped fields')} {...props}>
        {label && (
            <section className="field">
                <label>
                    {label}
                </label>
            </section>
        )}

        {children ? (
            injectName(name, children)
        ) : (
            fields.map(key =>
                <AutoField key={key} name={joinName(name, key)} />
            )
        )}
    </section>
;

export default connectField(Nest, {includeInChain: false});
