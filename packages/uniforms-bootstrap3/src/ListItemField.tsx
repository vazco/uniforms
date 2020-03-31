import React, { Children, ReactNode } from 'react';
import { connectField, joinName } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  children?: ReactNode;
  name: string;
  removeIcon?: any;
};

const ListItem = ({ removeIcon, children, name }: ListItemFieldProps) => (
  <div className="row">
    <div className="col-xs-1">
      <ListDelField name={name} removeIcon={removeIcon} />
    </div>

    {children ? (
      Children.map(children as JSX.Element, child =>
        React.cloneElement(child, {
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

export default connectField(ListItem, { includeInChain: false });
