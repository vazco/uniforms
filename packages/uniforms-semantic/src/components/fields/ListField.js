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
    disabled,
    error,
    initialCount,
    itemProps,
    label,
    name,
// onChange shouldn't be passed to <section>
// eslint-disable-next-line no-unused-vars
    onChange,
    required,
    value,
    ...props
}) =>
    <section className={classnames('ui', className, {disabled}, 'grouped fitted fields list')} {...props}>
        {label && (
            <section className={classnames({error, required}, 'field item')}>
                <label className="left floated">
                    {label}
                </label>

                <ListAddField name={`${name}.$`} initialCount={initialCount} className="right floated" />
            </section>
        )}

        {label && (
            <section className="ui fitted hidden clearing divider" />
        )}

        {children ? (
            value.map((item, index) =>
                Children.map(children, child =>
                    React.cloneElement(child, {
                        key: index,
                        label: null,
                        name: joinName(name, child.props.name && child.props.name.replace('$', index))
                    })
                )
            )
        ) : (
            value.map((item, index) =>
                <ListItemField key={index} label={null} name={joinName(name, index)} {...itemProps} />
            )
        )}
    </section>
;

export default connectField(List, {includeInChain: false});
