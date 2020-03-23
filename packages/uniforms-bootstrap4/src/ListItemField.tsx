import React, { Children } from 'react';
import { connectField, joinName } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';
import { AutoFieldProps } from './Types';

type ListItemProps = {
  name: string;
} & AutoFieldProps;

const ListItem = ({ name, children, removeIcon, ...props }: ListItemProps) => (
  <div className="row">
    <div className="col-1">
      <ListDelField name={name} removeIcon={removeIcon} />
    </div>

    {props.children ? (
      Children.map(children as JSX.Element, child =>
        React.cloneElement(child, {
          className: 'col-11',
          name: joinName(props.name, child.props.name),
          label: null,
        }),
      )
    ) : (
      <AutoField {...props} className="col-11" name={name} />
    )}
  </div>
);

export default connectField(ListItem, { includeInChain: false });
