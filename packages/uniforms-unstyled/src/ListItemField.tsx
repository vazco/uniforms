import React, {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { connectField, joinName } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  children: ReactNode;
  name: string;
};

function ListItem({ children }: ListItemFieldProps) {
  return (
    <div>
      <ListDelField name="" />
      {children}
    </div>
  );
}

ListItem.defaultProps = { children: <AutoField label={null} name="" /> };

export default connectField(ListItem);
