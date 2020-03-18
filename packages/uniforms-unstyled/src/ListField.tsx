import React, { Children } from 'react';
import { connectField, filterDOMProps, joinName } from 'uniforms';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

const List = ({ children, itemProps, label, name, value, ...props }) => {
  const listAddProps = { name: `${name}.$`, initialCount: props.initialCount };
  return (
    <ul {...filterDOMProps(props)}>
      {label && (
        <label>
          {label}

          <ListAddField
            {...listAddProps}
            // name={`${name}.$`}
            // initialCount={(initialCount as number) || undefined}
          />
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
    </ul>
  );
};

export default connectField(List, { includeInChain: false });
