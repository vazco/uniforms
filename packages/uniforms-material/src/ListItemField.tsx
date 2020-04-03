import ListItemMaterial, {
  ListItemProps as ListItemMaterialProps,
} from '@material-ui/core/ListItem';
import React, { Children, ReactNode, cloneElement } from 'react';
import { connectField, joinName } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  children?: ReactNode;
  name: string;
  removeIcon?: any;
} & Pick<ListItemMaterialProps, 'dense' | 'divider' | 'disableGutters'>;

const ListItem = ({
  children,
  dense,
  disableGutters,
  divider,
  name,
  removeIcon,
  ...props
}: ListItemFieldProps) => {
  return (
    <ListItemMaterial
      dense={dense}
      divider={divider}
      disableGutters={disableGutters}
    >
      {children ? (
        Children.map(children as JSX.Element, child =>
          cloneElement(child, {
            name: joinName(name, child.props.name),
            label: null,
          }),
        )
      ) : (
        <AutoField children={children} name={name} {...props} />
      )}
      <ListDelField name={name} icon={removeIcon} />
    </ListItemMaterial>
  );
};

ListItem.defaultProps = {
  dense: true,
};

export default connectField(ListItem, { includeInChain: false });
