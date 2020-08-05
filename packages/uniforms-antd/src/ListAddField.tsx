import Button, { ButtonProps } from 'antd/lib/button';
import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import {
  connectField,
  FieldProps,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListAddFieldProps = FieldProps<
  unknown,
  ButtonProps,
  { initialCount?: number }
>;

const defaultIcon = <PlusSquareOutlined />;
const defaultStyle = { width: '100%' };

function ListAdd({
  disabled,
  icon = defaultIcon,
  name,
  size = 'small',
  style = defaultStyle,
  type = 'dashed',
  value,
  ...props
}: ListAddFieldProps) {
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
      {...filterDOMProps({
        icon,
        size,
        style,
        type,
        ...props,
      })}
      disabled={!limitNotReached}
      onClick={() => {
        parent.onChange(parent.value!.concat([cloneDeep(value)]));
      }}
    />
  );
}

export default connectField(ListAdd, { initialValue: false, kind: 'leaf' });
