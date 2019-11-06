import Button from 'antd/lib/button';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';

const ListDel = ({ disabled, name, parent, ...props }: any) => {
  const fieldIndex = +name.slice(1 + name.lastIndexOf('.'));
  const limitNotReached =
    !disabled && !(parent.minCount >= parent.value.length);

  return (
    <Button
      disabled={!limitNotReached || disabled}
      onClick={() =>
        limitNotReached &&
        parent.onChange(
          []
            .concat(parent.value.slice(0, fieldIndex))
            .concat(parent.value.slice(1 + fieldIndex))
        )
      }
      {...filterDOMProps(props)}
    />
  );
};

ListDel.defaultProps = {
  icon: 'delete',
  shape: 'circle-outline',
  size: 'small',
  type: 'ghost'
};

export default connectField(ListDel, {
  includeParent: true,
  initialValue: false
});
