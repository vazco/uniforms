import React, {
  Children,
  HTMLProps,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { Override, connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = Override<
  Omit<HTMLProps<HTMLUListElement>, 'onChange'>,
  {
    children?: ReactNode;
    initialCount?: number;
    itemProps?: {};
    label?: ReactNode;
    name: string;
    value: unknown[];
  }
>;

function List({
  children = <ListItemField name="$" />,
  initialCount,
  itemProps,
  label,
  value,
  ...props
}: ListFieldProps) {
  return (
    <ul {...filterDOMProps(props)}>
      {label && (
        <label>
          {label}
          <ListAddField initialCount={initialCount} name="$" />
        </label>
      )}

      {value.map((item, itemIndex) =>
        Children.map(children, (child, childIndex) =>
          isValidElement(child)
            ? cloneElement(child, {
                key: `${itemIndex}-${childIndex}`,
                name: child.props.name?.replace('$', '' + itemIndex),
                ...itemProps,
              })
            : child,
        ),
      )}
    </ul>
  );
}

export default connectField(List);
