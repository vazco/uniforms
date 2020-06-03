import ListItemMaterial, { ListItemProps } from '@material-ui/core/ListItem';
import React, {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  children: ReactNode;
  dense?: ListItemProps['dense'];
  disableGutters?: ListItemProps['disableGutters'];
  divider?: ListItemProps['divider'];
  name: string;
  removeIcon?: ReactNode;
};

function ListItem({
  children,
  dense,
  disableGutters,
  divider,
  removeIcon,
}: ListItemFieldProps) {
  return (
    <ListItemMaterial
      dense={dense}
      disableGutters={disableGutters}
      divider={divider}
    >
      {children}
      <ListDelField name="" icon={removeIcon} />
    </ListItemMaterial>
  );
}

ListItem.defaultProps = {
  children: <AutoField label={null} name="" />,
  dense: true,
};

export default connectField(ListItem, { initialValue: false });
