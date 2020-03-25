import React, { Children, ReactNode } from 'react';
import { connectField, joinName } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

type ListItemProps = {
  children?: ReactNode;
  name: string;
  removeIcon?: any;
};

const ListItem = (props: ListItemProps) => {
  const { name, children, removeIcon } = props;
  return (
    <div className="row">
      <div className="col-1">
        <ListDelField name={name} removeIcon={removeIcon} />
      </div>

      {children ? (
        Children.map(children as JSX.Element, child =>
          React.cloneElement(child, {
            className: 'col-11',
            name: joinName(name, child.props.name),
            label: null,
          }),
        )
      ) : (
        <AutoField {...props} className="col-11" />
      )}
    </div>
  );
};

export default connectField(ListItem, { includeInChain: false });
