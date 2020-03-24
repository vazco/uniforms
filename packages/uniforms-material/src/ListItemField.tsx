import ListItemMaterial, {
  ListItemProps as ListItemMaterialProps,
} from '@material-ui/core/ListItem';
import React, { Children, ReactNode } from 'react';
import { connectField, joinName } from 'uniforms';

import ListDelField from './ListDelField';
import AutoField from './AutoField';
import { AutoFieldProps } from './Types';

type ListItemProps = {
  children?: ReactNode;
  removeIcon?: any;
} & AutoFieldProps &
  Pick<ListItemMaterialProps, 'dense' | 'divider' | 'disableGutters'>;

const ListItem = ({
  dense,
  children,
  divider,
  disableGutters,
  removeIcon,
  ...props
}: ListItemProps) => (
  <ListItemMaterial
    dense={dense}
    divider={divider}
    disableGutters={disableGutters}
  >
    {children ? (
      Children.map(children as JSX.Element, child =>
        React.cloneElement(child, {
          name: joinName(props.name, child.props.name),
          label: null,
        }),
      )
    ) : (
      <AutoField {...props} />
    )}
    <ListDelField name={props.name} icon={removeIcon} />
  </ListItemMaterial>
);

ListItem.defaultProps = {
  dense: true,
};

export default connectField(ListItem, { includeInChain: false });
