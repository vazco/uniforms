import React, { ReactNode } from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = { children?: ReactNode; value?: unknown };

const delStyle = {
  float: 'right' as const,
  marginBottom: '10px',
  marginLeft: '10px',
  marginRight: '6px',
  width: '20px',
};

const itemStyle = { marginBottom: '24px', overflow: 'hidden' };

const dividerStyle = {
  borderBottom: '1px solid #DDD',
  height: '20px',
  marginTop: '-8px',
};

const childrenStyle = { width: '100%' };

function ListItem({
  children = <AutoField label={null} name="" />,
}: ListItemFieldProps) {
  return (
    <div>
      <div style={delStyle}>
        <ListDelField className="top aligned" name="" />
      </div>

      <div style={itemStyle}>
        <div style={dividerStyle} />
      </div>

      <div style={childrenStyle}>{children}</div>
    </div>
  );
}

export default connectField<ListItemFieldProps>(ListItem);
