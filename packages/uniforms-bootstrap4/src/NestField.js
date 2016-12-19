import React          from 'react';
import classnames     from 'classnames';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import injectName     from 'uniforms/injectName';
import joinName       from 'uniforms/joinName';

import AutoField from './AutoField';

const Nest = ({
    children,
    className,
    error,
    errorMessage,
    fields,
    label,
    name,
    showInlineError,
    ...props
}) =>
    <section className={classnames(className, {'has-error': error})} {...filterDOMProps(props)}>
        {label && (
            <label>
                {label}
            </label>
        )}

        {!!(errorMessage && showInlineError) && (
            <span className="text-danger">
                {errorMessage}
            </span>
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
