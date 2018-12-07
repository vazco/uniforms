import ListItemMaterial from '@material-ui/core/ListItem';
import React from 'react';
import connectField from 'uniforms/connectField';
import joinName from 'uniforms/joinName';
import {Children} from 'react';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

const ListItem = ({dense, divider, disableGutters, removeIcon, ...props}) => (
  <ListItemMaterial dense={dense} divider={divider} disableGutters={disableGutters}>
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
    <ListDelField name={props.name} icon={removeIcon} />
  </ListItemMaterial>
);

ListItem.defaultProps = {
  dense: true
};

export default connectField(ListItem, {includeInChain: false, includeParent: true});
