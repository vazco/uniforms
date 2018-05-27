import List           from '@material-ui/core/List';
import ListSubheader  from '@material-ui/core/ListSubheader';
import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import joinName       from 'uniforms/joinName';
import {Children}     from 'react';
import {Fragment}     from 'react';

import ListAddField  from './ListAddField';
import ListItemField from './ListItemField';

const List_ = ({
    children,
    dense,
    initialCount,
    itemProps,
    label,
    name,
    value,
    ...props
}) =>
    <Fragment>
        <List
            dense={dense}
            subheader={label ? <ListSubheader disableSticky>{label}</ListSubheader> : undefined}
            {...filterDOMProps(props)}
        >
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
        </List>
        <ListAddField name={`${name}.$`} initialCount={initialCount} />
    </Fragment>
;

List_.defaultProps = {
    dense: true
};

List_.displayName = 'List';

export default connectField(List_, {includeInChain: false});
