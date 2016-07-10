import React          from 'react';
import classnames     from 'classnames';
import {Children}     from 'react';
import {connectField} from 'uniforms';
import {joinName}     from 'uniforms';

import ListAddField  from './ListAddField';
import ListItemField from './ListItemField';

const List = ({
    changed,      // eslint-disable-line
    changedMap,   // eslint-disable-line
    children,
    className,
    disabled,
    error,
    errorMessage, // eslint-disable-line
    field,        // eslint-disable-line
    fieldType,    // eslint-disable-line
    fields,       // eslint-disable-line
    findError,    // eslint-disable-line
    findField,    // eslint-disable-line
    findValue,    // eslint-disable-line
    id,           // eslint-disable-line
    initialCount,
    itemProps,
    label,
    maxCount,     // eslint-disable-line
    minCount,     // eslint-disable-line
    name,
    onChange,     // eslint-disable-line
    parent,       // eslint-disable-line
    placeholder,  // eslint-disable-line
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
