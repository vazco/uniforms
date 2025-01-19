import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
} from 'react';
import { HTMLFieldProps, connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = HTMLFieldProps<
  unknown[],
  HTMLUListElement,
  { itemProps?: object }
>;

function List({
  children = <ListItemField name="$" />,
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
          <ListAddField name="$" />
        </label>
      )}

      {value?.map((item, itemIndex) =>
        Children.map(children, (child, childIndex) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement, {
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

export default connectField<ListFieldProps>(List);
