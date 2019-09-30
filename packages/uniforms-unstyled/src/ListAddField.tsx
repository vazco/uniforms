import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const ListAdd = ({ disabled, parent, value, ...props }) => {
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
  includeParent: true,
  initialValue: false
});
