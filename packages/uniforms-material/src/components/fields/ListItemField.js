import React                          from 'react';
import {Children}                     from 'react';
import {connectField}                 from 'uniforms';
import {joinName}                     from 'uniforms';
import {ListItem as ListItemMaterial} from 'material-ui/List';

import AutoField    from './AutoField';
import ListDelField from './ListDelField';

const ListItem = props =>
    <ListItemMaterial
        disabled
        primaryText={props.children ? (
            Children.map(props.children, child =>
                React.cloneElement(child, {
                    name: joinName(props.name, child.props.name),
                    label: null
                })
            )
        ) : (
            <AutoField {...props} />
        )}
        rightIconButton={<ListDelField name={props.name} />}
    />
;

export default connectField(ListItem, {includeInChain: false});


