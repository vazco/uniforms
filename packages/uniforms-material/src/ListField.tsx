import ListMaterial, { ListProps } from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import React, {
  Children,
  HTMLProps,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { Override, connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps<T> = Override<
  ListProps,
  {
    addIcon?: any;
    initialCount?: number;
    itemProps?: {};
    label: string;
    name: string;
    value: T[];
  }
>;

function List<T>({
  addIcon,
  children,
  dense,
  initialCount,
  itemProps,
  label,
  name,
  value,
  ...props
}: ListFieldProps<T>) {
  return [
    <ListMaterial
      key="list"
      dense={dense ?? true}
      subheader={
        label ? <ListSubheader disableSticky>{label}</ListSubheader> : undefined
      }
      {...filterDOMProps(props)}
    >
      {children
        ? value.map((item, index) =>
            Children.map(children, child =>
              isValidElement(child) && child.props.name
                ? cloneElement(child, {
                    key: index,
                    name: child.props.name.replace('$', '' + index),
                  })
                : child,
            ),
          )
        : value.map((item, index) => (
            <ListItemField key={index} name={'' + index} {...itemProps} />
          ))}
    </ListMaterial>,
    <ListAddField
      icon={addIcon}
      initialCount={initialCount}
      key="listAddField"
      name="$"
    />,
  ];
}

// FIXME: Use React.Fragment instead of returning an array if possible.
// @ts-ignore
export default connectField(List);
