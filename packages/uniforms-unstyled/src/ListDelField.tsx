import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';

const ListDel = ({
  disabled,
  name,
  parent,
  ...props
}: {
  disabled?: boolean;
  parent?: any;
  value?: any;
  name: string;
}) => {
  const fieldIndex = +name.slice(1 + name.lastIndexOf('.'));
  const limitNotReached =
    !disabled && !(parent.minCount >= parent.value.length);

  return (
    <span
      {...filterDOMProps(props)}
      onClick={() =>
        limitNotReached &&
        parent.onChange(
          []
            .concat(parent.value.slice(0, fieldIndex))
            .concat(parent.value.slice(1 + fieldIndex)),
        )
      }
    >
      -
    </span>
  );
};

export default connectField(ListDel, { initialValue: false });
