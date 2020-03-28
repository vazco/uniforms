import Button, { ButtonProps } from 'antd/lib/button';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { filterDOMProps, joinName, useField } from 'uniforms';
import { PlusSquareOutlined } from '@ant-design/icons';

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    !props.disabled && !(parent.maxCount! <= parent.value!.length);
  return (
    <Button
      disabled={!limitNotReached || rawProps.disabled}
      onClick={() => {
        if (limitNotReached)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          parent.onChange(parent.value!.concat([cloneDeep(props.value!)]));
      }}
      {...filterDOMProps(props)}
    />
  );
}

ListAdd.defaultProps = {
  icon: <PlusSquareOutlined />,
  size: 'small',
  style: { width: '100%' },
  type: 'dashed',
};

export default ListAdd;
