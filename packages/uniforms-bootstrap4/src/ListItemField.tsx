import React, { ReactNode } from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  children: ReactNode;
  name: string;
  removeIcon?: any;
};

function ListItem({ children, removeIcon, ...props }: ListItemFieldProps) {
  return (
    <div className="row">
      <div className="col-1">
        <ListDelField name="" removeIcon={removeIcon} />
      </div>
      {children}
    </div>
  );
}

ListItem.defaultProps = { children: <AutoField label={null} name="" /> };

export default connectField(ListItem, { initialValue: false });
