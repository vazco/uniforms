import React, { ReactNode } from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  children?: ReactNode;
  value?: unknown;
};

function ListItem({
  children = <AutoField label={null} name="" />,
}: ListItemFieldProps) {
  return (
    <div className="item">
      <ListDelField className="top aligned" name="" />

      <div className="middle aligned content" style={{ width: '100%' }}>
        {children}
      </div>
    </div>
  );
}

export default connectField(ListItem, { initialValue: false });
