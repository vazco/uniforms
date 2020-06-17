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

export type ListFieldProps = Override<
  Omit<ListProps, 'onChange'>,
  {
    addIcon?: ReactNode;
    children?: ReactNode;
    initialCount?: number;
    itemProps?: {};
    label?: string;
    name: string;
    value: unknown[];
  }
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
        {...filterDOMProps(props)}
      >
        {value.map((item, itemIndex) =>
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
