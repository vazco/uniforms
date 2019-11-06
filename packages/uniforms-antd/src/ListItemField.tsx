import React, { Children } from 'react';
import { connectField, joinName } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

const ListItem = (props: any) => (
  <div>
    <div
      style={{
        float: 'right',
        marginBottom: '10px',
        marginLeft: '10px',
        marginRight: '6px',
        width: '20px',
      }}
    >
      <ListDelField className="top aligned" name={props.name} />
    </div>

    <div style={{ marginBottom: '4px', overflow: 'hidden' }}>
      <div
        style={{
          borderBottom: '1px solid #DDD',
          height: '20px',
          marginTop: '-8px',
        }}
      />
    </div>

    <div style={{ width: '100%' }}>
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
  </div>
);
export default connectField(ListItem, {
  includeInChain: false,
  includeParent: true,
});
