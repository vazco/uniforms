import React, { ReactNode } from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = { children?: ReactNode; value?: unknown };

const listDelFieldWrapperStyle = {
  float: 'right' as const,
  marginBottom: '10px',
  marginLeft: '10px',
  marginRight: '6px',
  width: '20px',
};

const listItemDividerWrapperStyle = {
  marginBottom: '24px',
  overflow: 'hidden',
};

const listItemDividerStyle = {
  borderBottom: '1px solid #DDD',
  height: '20px',
  marginTop: '-8px',
};

const listItemChildrenWrapperStyle = { width: '100%' };

const defaultChildren = <AutoField label={null} name="" />;

function ListItem({ children = defaultChildren }: ListItemFieldProps) {
  return (
    <div>
      <div style={listDelFieldWrapperStyle}>
        <ListDelField className="top aligned" name="" />
      </div>

      <div style={listItemDividerWrapperStyle}>
        <div style={listItemDividerStyle} />
      </div>

      <div style={listItemChildrenWrapperStyle}>{children}</div>
    </div>
  );
}

export default connectField(ListItem);
