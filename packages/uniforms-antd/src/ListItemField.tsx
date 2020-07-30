import React, { ReactNode } from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = { children?: ReactNode; value?: unknown };

function ListItem({
  children = <AutoField label={null} name="" />,
}: ListItemFieldProps) {
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

      <div style={{ marginBottom: '24px', overflow: 'hidden' }}>
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

export default connectField(ListItem);
