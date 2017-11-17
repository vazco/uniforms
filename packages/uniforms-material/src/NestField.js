import React          from 'react';
import Subheader      from 'material-ui/Subheader';
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
    style,
    ...props
}) =>
    <div style={{display: 'flex', flexDirection: 'column', ...style}} {...filterDOMProps(props)}>
        {!!label && <Subheader children={label} style={{paddingLeft: 0}} />}

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
