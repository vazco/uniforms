import React, { Children, ReactNode, cloneElement } from 'react';
import { joinName } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

type ListItemProps = {
  children?: ReactNode;
  label: null | string;
  name: string;
};

export default function ListItem(props: ListItemProps) {
  return (
    <div>
      <ListDelField name={props.name} />

      {props.children ? (
        Children.map(props.children as JSX.Element, child =>
          cloneElement(child, {
            name: joinName(props.name, child.props.name),
            label: null,
          }),
        )
      ) : (
        <AutoField {...props} />
      )}
    </div>
  );
}
