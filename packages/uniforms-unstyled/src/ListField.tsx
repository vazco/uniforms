import React, { Children, HTMLProps, ReactNode, cloneElement } from 'react';
import { connectField, filterDOMProps, joinName, Override } from 'uniforms';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

export type ListFieldProps<T> = Override<
  HTMLProps<HTMLUListElement>,
  {
    children?: ReactNode;
    initialCount?: number;
    itemProps?: {};
    label: string;
    name: string;
    value: T[];
  }
>;

function List<T>({
  children,
  initialCount,
  itemProps,
  label,
  name,
  value,
  ...props
}: ListFieldProps<T>) {
  return (
    <ul {...filterDOMProps(props)}>
      {label && (
        <label>
          {label}
          <ListAddField initialCount={initialCount} name={`${name}.$`} />
        </label>
      )}

      {children
        ? value.map((item, index) =>
            Children.map(children as JSX.Element, child =>
              cloneElement(child, {
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
}

export default connectField(List, {
  includeInChain: false,
});
