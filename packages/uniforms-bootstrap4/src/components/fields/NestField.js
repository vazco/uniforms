import React          from 'react';
import classnames     from 'classnames';
import {Children}     from 'react';
import {connectField} from 'uniforms';
import {joinName}     from 'uniforms';

import AutoField from './AutoField';

// eslint-disable-next-line no-unused-vars
const Nest = ({className, children, disabled, error, fields, label, name, onChange, ...props}) =>
    <section className={classnames(className, {disabled, error}, 'grouped fields')} {...props}>
        {label && (
            <section className="field">
                <label>
                    {label}
                </label>
            </section>
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
