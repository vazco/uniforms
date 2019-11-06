import ListMaterial from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import React, { Children } from 'react';
import { connectField, filterDOMProps, joinName } from 'uniforms';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

const List = ({
  addIcon,
  children,
  dense,
  initialCount,
  itemProps,
  label,
  name,
  value,
  ...props
}) => [
  <ListMaterial
    key="list"
    dense={dense}
    subheader={
      label ? <ListSubheader disableSticky>{label}</ListSubheader> : undefined
    }
    {...filterDOMProps(props)}
  >
    {children
      ? value.map((item, index) =>
          Children.map(children, child =>
            React.cloneElement(child, {
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
            label={null}
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

List.defaultProps = {
  dense: true,
};

export default connectField(List, {
  ensureValue: false,
  includeInChain: false,
});
