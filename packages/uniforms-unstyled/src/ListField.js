import React, { Children } from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import joinName from 'uniforms/joinName';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

const List = ({
  children,
  initialCount,
  itemProps,
  label,
  name,
  value,
  ...props
}) => (
  <ul {...filterDOMProps(props)}>
    {label && (
      <label>
        {label}

        <ListAddField name={`${name}.$`} initialCount={initialCount} />
      </label>
    )}

    {children
      ? value.map((item, index) =>
          Children.map(children, child =>
            React.cloneElement(child, {
              key: index,
              label: null,
              name: joinName(
                name,
                child.props.name && child.props.name.replace('$', index)
              )
            })
          )
        )
      : value.map((item, index) => (
          <ListItemField
            key={index}
            label={null}
            name={joinName(name, index)}
            {...itemProps}
          />
        ))}
  </ul>
);
export default connectField(List, {
  ensureValue: false,
  includeInChain: false
});
