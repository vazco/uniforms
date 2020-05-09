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
      <div className="col-xs-1">
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
        <AutoField {...props} className="col-xs-11" />
      )}
    </div>
  );
}
