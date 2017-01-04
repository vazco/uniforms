import classnames     from 'classnames';
import connectField   from 'uniforms/connectField';
import injectName     from 'uniforms/injectName';
import joinName       from 'uniforms/joinName';
import React          from 'react';

import AutoField from './AutoField';

const Nest = ({
    children,
    className,
    disabled,
    error,
    errorMessage,
    fields,
    label,
    name,
    showInlineError
}) =>
    <section className={classnames(className, {disabled, error}, 'grouped fields')} >
        {label && (
            <section className="field">
                <label>
                    {label}
                </label>
            </section>
        )}

        {!!(errorMessage && showInlineError) && (
            <section className="ui red basic label">
                {errorMessage}
            </section>
        )}

        {children ? (
            injectName(name, children)
        ) : (
            fields.map(key =>
                <AutoField
                    key={key}
                    name={joinName(name, key)}
                />
            )
        )}
    </section>
;

export default connectField(Nest, {includeInChain: false});
