import React            from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {injectName}     from 'uniforms';
import {joinName}       from 'uniforms';

import AutoField from './AutoField';

const Nest = ({
    children,
    fields,
    label,
    name,
    ...props
}) =>
    <section {...filterDOMProps(props)}>
        {label && (
            <label>
                {label}
            </label>
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
