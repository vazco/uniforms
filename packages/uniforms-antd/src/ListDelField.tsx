import Button, {
  ButtonProps,
  ButtonType,
  ButtonSize,
  ButtonShape,
} from 'antd/lib/button';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import React from 'react';
import {
  FieldProps,
  filterDOMProps,
  joinName,
  useField,
  connectField,
} from 'uniforms';

export type ListDelFieldProps = FieldProps<unknown, ButtonProps>;

const defaultProps = {
  icon: <DeleteOutlined />,
  shape: 'circle-outline' as ButtonShape,
  size: 'small' as ButtonSize,
  type: 'ghost' as ButtonType,
};

function ListDel({
  disabled,
  icon = defaultProps.icon,
  name,
  shape = defaultProps.shape,
  size = defaultProps.size,
  type = defaultProps.type,
  ...props
}: ListDelFieldProps) {
  const nameParts = joinName(null, name);
  const nameIndex = +nameParts[nameParts.length - 1];
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true },
  )[0];

  const limitNotReached =
    !disabled && !(parent.minCount! >= parent.value!.length);

  return (
    <Button
      {...filterDOMProps({
        icon,
        shape,
        size,
        type,
        ...props,
      })}
      disabled={!limitNotReached}
      onClick={() => {
        const value = parent.value!.slice();
        value.splice(nameIndex, 1);
        parent.onChange(value);
      }}
    />
  );
}

export default connectField(ListDel, { initialValue: false, kind: 'leaf' });
