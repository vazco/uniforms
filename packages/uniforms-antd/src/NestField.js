import React        from 'react';
import connectField from 'uniforms/connectField';
import injectName   from 'uniforms/injectName';
import joinName     from 'uniforms/joinName';

import AutoField from './AutoField';

const Nest = ({
    children,
    errorMessage,
    fields,
    label,
    name,
    showInlineError
}) =>
    <section>
        {label && (
            <label>
                {label}
            </label>
        )}

        {!!(errorMessage && showInlineError) && (
            <section>
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
