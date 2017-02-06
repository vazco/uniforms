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
    <div>
        {label && (
            <label>
                {label}
            </label>
        )}

        {!!(errorMessage && showInlineError) && (
            <div>
                {errorMessage}
            </div>
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
    </div>
;

export default connectField(Nest, {includeInChain: false});
