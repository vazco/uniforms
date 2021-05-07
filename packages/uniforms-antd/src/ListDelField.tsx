import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import Button, { ButtonProps } from 'antd/lib/button';
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
  readOnly,
  shape = 'circle',
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
      disabled={!limitNotReached}
      icon={icon}
      onClick={() => {
        if (!readOnly) {
          const value = parent.value!.slice();
          value.splice(nameIndex, 1);
          parent.onChange(value);
        }
      }}
      shape={shape}
      size={size}
      type={type}
    />
  );
}

export default connectField<ListDelFieldProps>(ListDel, {
  initialValue: false,
  kind: 'leaf',
});
