import Button, { ButtonProps } from 'antd/lib/button';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import React from 'react';
import {
  connectField,
  FieldProps,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListDelFieldProps = FieldProps<unknown, ButtonProps>;

function ListDel({
  disabled,
  icon = <DeleteOutlined />,
  name,
  shape = 'circle-outline',
  size = 'small',
  type = 'ghost',
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
      {...filterDOMProps(props)}
      icon={icon}
      shape={shape}
      size={size}
      type={type}
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
