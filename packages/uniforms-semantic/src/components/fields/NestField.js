import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {injectName}     from 'uniforms';
import {joinName}       from 'uniforms';

import AutoField from './AutoField';

const Nest = ({
    children,
    className,
    disabled,
    error,
    fields,
    label,
    name,
    ...props
}) =>
    <section className={classnames(className, {disabled, error}, 'grouped fields')} {...filterDOMProps(props)}>
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
