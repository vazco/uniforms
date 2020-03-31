import React, { Children, HTMLProps, ReactNode, cloneElement } from 'react';
import { connectField, filterDOMProps, joinName } from 'uniforms';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

export type ListFieldProps<T> = {
  children?: ReactNode;
  initialCount?: number;
  itemProps?: {};
  name: string;
  label: string;
  value: T[];
} & Omit<HTMLProps<HTMLUListElement>, 'children' | 'name'>;

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

export default connectField<ListFieldProps<any>>(List, {
  includeInChain: false,
});
