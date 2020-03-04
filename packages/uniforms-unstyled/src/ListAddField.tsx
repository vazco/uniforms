import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { connectField, filterDOMProps } from 'uniforms';

const ListAdd = ({
  disabled,
  parent,
  value,
  ...props
}: {
  disabled?: boolean;
  parent?: any;
  value?: any;
  name: string;
}) => {
  const limitNotReached = !disabled && !(parent.maxCount <= value.length);

  return (
    <span
      {...filterDOMProps(props)}
      onClick={() =>
        limitNotReached &&
        parent.onChange(parent.value.concat([cloneDeep(value)]))
      }
    >
      +
    </span>
  );
};

export default connectField(ListAdd, {
  initialValue: false,
});
