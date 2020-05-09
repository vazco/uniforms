import ListItemMaterial, { ListItemProps } from '@material-ui/core/ListItem';
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
} & Pick<ListItemProps, 'dense' | 'divider' | 'disableGutters'>;

export default function ListItemField({
  children,
  dense,
  disableGutters,
  divider,
  name,
  removeIcon,
  ...props
}: ListItemFieldProps) {
  return (
    <ListItemMaterial
      dense={dense}
      divider={divider}
      disableGutters={disableGutters}
    >
      {children ? (
        Children.map(children, child =>
          isValidElement(child)
            ? cloneElement(child, {
                name: joinName(name, child.props.name),
                label: null,
              })
            : child,
        )
      ) : (
        <AutoField children={children} name={name} {...props} />
      )}
      <ListDelField name={name} icon={removeIcon} />
    </ListItemMaterial>
  );
}

ListItemField.defaultProps = {
  dense: true,
};
