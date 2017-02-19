import React        from 'react';
import connectField from 'uniforms/connectField';
import injectName   from 'uniforms/injectName';
import joinName     from 'uniforms/joinName';

import AutoField from './AutoField';

const Nest = ({
    children,
    errorMessage,
    fields,
    itemProps,
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
                <AutoField key={key} name={joinName(name, key)} {...itemProps} />
            )
        )}
    </div>
;

export default connectField(Nest, {includeInChain: false});
