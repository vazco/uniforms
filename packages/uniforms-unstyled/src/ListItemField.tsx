import React, { Children } from 'react';
import { connectField, joinName } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

const ListItem = props => (
  <div>
    <ListDelField name={props.name} />

    {props.children ? (
      Children.map(props.children, child =>
        React.cloneElement(child, {
          name: joinName(props.name, child.props.name),
          label: null,
        }),
      )
    ) : (
      <AutoField {...props} />
    )}
  </div>
);
export default connectField(ListItem, {
  includeInChain: false,
  includeParent: true,
});
