import React, { Children } from 'react';
import { connectField, joinName } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';
import { AutoFieldProps } from './Types';

type ListItemProps = {
  name: string;
} & AutoFieldProps;

const ListItem = ({ children, name, ...props }: ListItemProps) => (
  <div className="item">
    <ListDelField className="top aligned" name={name} />

    <div className="middle aligned content" style={{ width: '100%' }}>
      {children ? (
        Children.map(children as JSX.Element, child =>
          React.cloneElement(child, {
            name: joinName(name, child.props.name),
            label: null,
            style: {
              margin: 0,
              ...child.props.style,
            },
          }),
        )
      ) : (
        <AutoField name={name} {...props} style={{ margin: 0 }} />
      )}
    </div>
  </div>
);

export default connectField<ListItemProps>(ListItem, { includeInChain: false });
