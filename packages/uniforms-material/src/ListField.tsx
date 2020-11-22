import ListMaterial, { ListProps } from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import React, {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';
import wrapField from './wrapField';

export type ListFieldProps = FieldProps<
  unknown[],
  ListProps,
  { addIcon?: ReactNode; initialCount?: number; itemProps?: {} }
>;

function List({
  addIcon,
  children = <ListItemField name="$" />,
  dense,
  initialCount,
  itemProps,
  label,
  name,
  value,
  ...props
}: ListFieldProps) {
  return (
    <>
      <ListMaterial
        dense={dense ?? true}
        subheader={
          label ? (
            <ListSubheader disableSticky>{label}</ListSubheader>
          ) : undefined
        }
        {...wrapField.__filterProps(filterDOMProps(props))}
      >
        {value?.map((item, itemIndex) =>
          Children.map(children, (child, childIndex) =>
            isValidElement(child)
              ? cloneElement(child, {
                  key: `${itemIndex}-${childIndex}`,
                  name: child.props.name?.replace('$', '' + itemIndex),
                  ...itemProps,
                })
              : child,
          ),
        )}
      </ListMaterial>
      <ListAddField icon={addIcon} initialCount={initialCount} name="$" />
    </>
  );
}

export default connectField(List);
