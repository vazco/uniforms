import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import injectName     from 'uniforms/injectName';
import joinName       from 'uniforms/joinName';

import AutoField from './AutoField';

const Nest = ({
    children,
    fields,
    itemProps,
    label,
    name,
    ...props
}) =>
    <div {...filterDOMProps(props)}>
        {label && (
            <label>
                {label}
            </label>
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

export default connectField(Nest, {ensureValue: false, includeInChain: false});
