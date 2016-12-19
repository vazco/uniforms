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
            <span className="help-block">
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
