import React, { Children } from 'react';
import { connectField, joinName } from 'uniforms';

import { AutoFieldProps } from './Types';
import AutoField from './AutoField';
import ListDelField from './ListDelField';

type ListItemProps = {} & AutoFieldProps;

const ListItem = ({ removeIcon, children, name, ...props }: ListItemProps) => (
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
      <AutoField {...props} className="col-xs-11" name={name} />
    )}
  </div>
);

export default connectField(ListItem, { includeInChain: false });
