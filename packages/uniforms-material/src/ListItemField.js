import connectField                        from 'uniforms/connectField';
import joinName                            from 'uniforms/joinName';
import React                               from 'react';
import {Children}                          from 'react';
import {ListItem, ListItemSecondaryAction} from 'material-ui/List';

import AutoField    from './AutoField';
import ListDelField from './ListDelField';

const ListItem_ = props => (
    <ListItem>
        {props.children ? (
            Children.map(props.children, child =>
                React.cloneElement(child, {
                    name: joinName(props.name, child.props.name),
                    label: null
                })
            )
        ) : (
            <AutoField {...props} />
        )}
        <ListItemSecondaryAction>
            <ListDelField name={props.name} />
        </ListItemSecondaryAction>
    </ListItem>
);

export default connectField(ListItem_, {includeInChain: false, includeParent: true});


