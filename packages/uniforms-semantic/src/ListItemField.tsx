import React, { Children, ReactNode } from 'react';
import { connectField, joinName } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  name: string;
  children?: ReactNode;
};

const ListItem = (props: ListItemFieldProps) => {
  const { children, name } = props;
  return (
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
          <AutoField {...props} style={{ margin: 0 }} />
        )}
      </div>
    </div>
  );
};

export default connectField<ListItemFieldProps>(ListItem, {
  includeInChain: false,
});
