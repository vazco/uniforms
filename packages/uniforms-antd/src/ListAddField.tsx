import Button, { ButtonProps } from 'antd/lib/button';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { filterDOMProps, joinName, useField } from 'uniforms';

type ListAddProps<T> = {
  initialCount?: number;
  parent?: any;
  name: string;
  disabled?: boolean;
  value?: T;
} & ButtonProps;

function ListAdd<T>(rawProps: ListAddProps<T>) {
  const props = useField<ListAddProps<T>, T>(rawProps.name, rawProps, {
    initialValue: false,
  })[0];

  const parentName = joinName(joinName(null, props.name).slice(0, -1));
  const parent = useField<{ maxCount?: number }, T[]>(parentName, {})[0];
  if (rawProps.parent) Object.assign(parent, rawProps.parent);

  const limitNotReached =
    !props.disabled && !(parent.maxCount! <= parent.value!.length);
  return (
    <Button
      disabled={!limitNotReached || rawProps.disabled}
      onClick={() => {
        if (limitNotReached)
          parent.onChange(parent.value!.concat([cloneDeep(props.value!)]));
      }}
      {...filterDOMProps(props)}
    />
  );
}

ListAdd.defaultProps = {
  icon: 'plus-square-o',
  size: 'small',
  style: { width: '100%' },
  type: 'dashed',
};

export default ListAdd;
