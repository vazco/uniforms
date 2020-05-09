import React, {
  Children,
  HTMLProps,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { Override, connectField, filterDOMProps } from 'uniforms';

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
          <ListAddField initialCount={initialCount} name="$" />
        </label>
      )}

      {children
        ? value.map((item, index) =>
            Children.map(children, child =>
              isValidElement(child) && child.props.name
                ? cloneElement(child, {
                    key: index,
                    name: child.props.name.replace('$', '' + index),
                  })
                : child,
            ),
          )
        : value.map((item, index) => (
            <ListItemField key={index} name={'' + index} {...itemProps} />
          ))}
    </ul>
  );
}

export default connectField(List);
