import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import {injectName}   from 'uniforms';
import {joinName}     from 'uniforms';

import AutoField from './AutoField';

const Nest = ({
    children,
    className,
    disabled,
    error,
    fields,
    label,
    name,
// onChange shouldn't be passed to <section>
// eslint-disable-next-line no-unused-vars
    onChange,
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
