import React, { Children, ReactNode, cloneElement } from 'react';
import { connectField, joinName } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  children?: ReactNode;
  name: string;
  removeIcon?: any;
};

function ListItem({ removeIcon, children, name }: ListItemFieldProps) {
  return (
    <div className="row">
      <div className="col-xs-1">
        <ListDelField name={name} removeIcon={removeIcon} />
      </div>

      {children ? (
        Children.map(children as JSX.Element, child =>
          cloneElement(child, {
            className: 'col-xs-11',
            name: joinName(name, child.props.name),
            label: null,
          }),
        )
      ) : (
        <AutoField children={children} className="col-xs-11" name={name} />
      )}
    </div>
  );
}
export default connectField(ListItem, { includeInChain: false });
