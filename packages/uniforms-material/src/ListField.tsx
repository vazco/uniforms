import ListMaterial, {
  ListProps as MaterialListProps,
} from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import React, { Children, cloneElement } from 'react';
import { connectField, filterDOMProps, joinName, Override } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps<T> = Override<
  MaterialListProps,
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
            Children.map(children as JSX.Element, child =>
              cloneElement(child, {
                key: index,
                label: null,
                name: joinName(
                  name,
                  child.props.name && child.props.name.replace('$', index),
                ),
              }),
            ),
          )
        : value.map((item, index) => (
            <ListItemField
              key={index}
              label={undefined}
              name={joinName(name, index)}
              {...itemProps}
            />
          ))}
    </ListMaterial>,
    <ListAddField
      key="listAddField"
      name={`${name}.$`}
      icon={addIcon}
      initialCount={initialCount}
    />,
  ];
}

// FIXME: Use React.Fragment instead of returning an array if possible.
// @ts-ignore
export default connectField<ListFieldProps<any>>(List, {
  includeInChain: false,
});
