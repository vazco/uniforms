import React          from 'react';
import {Children}     from 'react';
import {connectField} from 'uniforms';
import {joinName}     from 'uniforms';

import ListAddField  from './ListAddField';
import ListItemField from './ListItemField';

const List = ({
    changed,      // eslint-disable-line
    changedMap,   // eslint-disable-line
    children,
    disabled,     // eslint-disable-line
    error,        // eslint-disable-line
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
    required,     // eslint-disable-line
    value,
    ...props
}) =>
    <ul {...props}>
        {label && (
            <label>
                {label}

                <ListAddField name={`${name}.$`} initialCount={initialCount} />
            </label>
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
    </ul>
;

export default connectField(List, {includeInChain: false});
