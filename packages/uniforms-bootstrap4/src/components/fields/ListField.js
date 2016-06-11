import React          from 'react';
import classnames     from 'classnames';
import {Children}     from 'react';
import {connectField} from 'uniforms';
import {joinName}     from 'uniforms';

import ListAddField  from './ListAddField';
import ListItemField from './ListItemField';

const List = ({
    children,
    className,
    initialCount,
    label,
    name,
// onChange shouldn't be passed to <section>
// eslint-disable-next-line no-unused-vars
    onChange,
    value,
    ...props
}) =>
    <section className={classnames('card', className)} {...props}>
        <section className="card-block">
            {label && (
                <section className="card-title">
                    <label className="control-label">
                        {label}&nbsp;
                    </label>

                    <ListAddField name={`${name}.$`} initialCount={initialCount} />
                </section>
            )}

            {children ? (
                value.map((item, index) =>
                      Children.map(children, child =>
                           React.cloneElement(child, {
                               key: index,
                               label: null,
                               name: joinName(
                                   name,
                                   child.props.name && child.props.name.replace('$', index)
                               )
                           })
                      )
                 )
            ) : (
                value.map((item, index) =>
                    <ListItemField
                        key={index}
                        label={null}
                        name={joinName(name, index)}
                    />
                )
            )}
        </section>
    </section>
;

export default connectField(List, {includeInChain: false});
