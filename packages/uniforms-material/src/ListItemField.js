import ListItem     from '@material-ui/core/ListItem';
import React        from 'react';
import connectField from 'uniforms/connectField';
import joinName     from 'uniforms/joinName';
import {Children}   from 'react';

import AutoField    from './AutoField';
import ListDelField from './ListDelField';

const ListItem_ = ({dense, divider, disableGutters, ...props}) => (
    <ListItem dense={dense} divider={divider} disableGutters={disableGutters}>
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
        <ListDelField name={props.name} />
    </ListItem>
);

ListItem_.defaultProps = {
    dense: true
};

ListItem_.displayName = 'ListItem';

export default connectField(ListItem_, {includeInChain: false, includeParent: true});


