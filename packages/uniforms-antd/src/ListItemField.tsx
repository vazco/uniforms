import React, { ReactNode } from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  children: ReactNode;
  label?: any;
  labelCol?: string;
  name: string;
  wrapperCol?: any;
};

function ListItem({ children }: ListItemFieldProps) {
  return (
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
        <ListDelField className="top aligned" name="" />
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

      <div style={{ width: '100%' }}>{children}</div>
    </div>
  );
}

ListItem.defaultProps = { children: <AutoField label={null} name="" /> };

export default connectField(ListItem);
