import React, { ReactNode } from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  children?: ReactNode;
  name: string;
};

function ListItem({ children }: ListItemFieldProps) {
  return (
    <div className="item">
      <ListDelField className="top aligned" name="" />

      <div className="middle aligned content" style={{ width: '100%' }}>
        {children}
      </div>
    </div>
  );
}

ListItem.defaultProps = { children: <AutoField label={null} name="" /> };

export default connectField(ListItem, { initialValue: false });
