import React          from 'react';
import {Children}     from 'react';
import {connectField} from 'uniforms';
import {joinName}     from 'uniforms';

import AutoField from './AutoField';

// eslint-disable-next-line no-unused-vars
const Nest = ({children, fields, label, name, onChange, ...props}) =>
    <section {...props}>
        {label && (
            <label>
                {label}
            </label>
        )}

        {children ? (
            Children.map(children, child =>
                React.cloneElement(child, {
                    name: joinName(name, child.props.name)
                })
            )
        ) : (
            fields.map(key =>
                <AutoField key={key} name={joinName(name, key)} />
            )
        )}
    </section>
;

export default connectField(Nest, {includeInChain: false});
