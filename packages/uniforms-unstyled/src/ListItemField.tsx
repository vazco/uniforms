import React, {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { joinName } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  children?: ReactNode;
  name: string;
};

export default function ListItemField(props: ListItemFieldProps) {
  return (
    <div>
      <ListDelField name={props.name} />

      {props.children ? (
        Children.map(props.children, child =>
          isValidElement(child)
            ? cloneElement(child, {
                name: joinName(props.name, child.props.name),
                label: null,
              })
            : child,
        )
      ) : (
        <AutoField {...props} />
      )}
    </div>
  );
}
