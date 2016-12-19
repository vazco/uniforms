import React            from 'react';
import {Children}       from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {joinName}       from 'uniforms';

import ListAddField  from './ListAddField';
import ListItemField from './ListItemField';

const List = ({
    children,
    initialCount,
    itemProps,
    label,
    name,
    value,
    ...props
}) =>
    <ul {...filterDOMProps(props)}>
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
