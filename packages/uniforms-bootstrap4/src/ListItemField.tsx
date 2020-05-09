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
  removeIcon?: any;
};

export default function ListItemField({
  children,
  removeIcon,
  ...props
}: ListItemFieldProps) {
  return (
    <div className="row">
      <div className="col-1">
        <ListDelField name={props.name} removeIcon={removeIcon} />
      </div>

      {children ? (
        Children.map(children, child =>
          isValidElement(child)
            ? cloneElement(child, {
                name: joinName(props.name, child.props.name),
                label: null,
              })
            : child,
        )
      ) : (
        <AutoField {...props} className="col-11" />
      )}
    </div>
  );
}
