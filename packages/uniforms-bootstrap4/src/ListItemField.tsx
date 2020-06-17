import React, { ReactNode } from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  children?: ReactNode;
  name: string;
  removeIcon?: ReactNode;
};

function ListItem({
  children = <AutoField className="col-11" label={null} name="" />,
  removeIcon,
  ...props
}: ListItemFieldProps) {
  return (
    <div className="row">
      <div className="col-1">
        <ListDelField name="" removeIcon={removeIcon} />
      </div>
      {children}
    </div>
  );
}

export default connectField(ListItem, { initialValue: false });
