import Button from 'antd/lib/button';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const ListAdd = ({disabled, parent, value, ...props}) => {
  const limitNotReached = !disabled && !(parent.maxCount <= parent.value.length);

  return (
    <Button
      disabled={!limitNotReached || disabled}
      onClick={() => limitNotReached && parent.onChange(parent.value.concat([cloneDeep(value)]))}
      {...filterDOMProps(props)}
    />
  );
};

ListAdd.defaultProps = {
  icon: 'plus-square-o',
  size: 'small',
  style: {width: '100%'},
  type: 'dashed'
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
