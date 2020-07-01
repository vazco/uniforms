import Button, { ButtonProps, ButtonSize, ButtonType } from 'antd/lib/button';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import {
  Override,
  filterDOMProps,
  joinName,
  useField,
  connectField,
} from 'uniforms';
import { PlusSquareOutlined } from '@ant-design/icons/lib';

export type ListAddFieldProps = Override<
  Omit<ButtonProps, 'onChange'>,
  { initialCount?: number; name: string; value: unknown }
>;

function ListAdd({ disabled, name, value, ...props }: ListAddFieldProps) {
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true },
  )[0];

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <Button
      // FIXME: filterDOMProps will remove value.
      {...(filterDOMProps(props) as Omit<typeof props, 'value'>)}
      disabled={!limitNotReached}
      onClick={() => {
        parent.onChange(parent.value!.concat([cloneDeep(value)]));
      }}
    />
  );
}

ListAdd.defaultProps = {
  icon: <PlusSquareOutlined />,
  size: 'small' as ButtonSize,
  style: { width: '100%' },
  type: 'dashed' as ButtonType,
};

export default connectField(ListAdd, { initialValue: false, kind: 'leaf' });
