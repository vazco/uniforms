import ListMaterial, { ListProps } from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import React, {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = FieldProps<
  unknown[],
  ListProps,
  { addIcon?: ReactNode; itemProps?: object }
>;

function List({
  addIcon,
  children = <ListItemField name="$" />,
  itemProps,
  label,
  value,
  ...props
}: ListFieldProps) {
  return (
    <>
      <ListMaterial
        dense
        subheader={
          label ? (
            <ListSubheader disableSticky>{label}</ListSubheader>
          ) : undefined
        }
        {...filterDOMProps(props)}
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
      <ListAddField icon={addIcon} name="$" />
    </>
  );
}

export default connectField<ListFieldProps>(List);
