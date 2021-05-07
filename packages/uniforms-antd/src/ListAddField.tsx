import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined';
import Button, { ButtonProps } from 'antd/lib/button';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import {
  FieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListAddFieldProps = FieldProps<
  unknown,
  ButtonProps,
  { initialCount?: number }
>;

const defaultStyle = { width: '100%' };

function ListAdd({
  disabled,
  icon = <PlusSquareOutlined />,
  initialCount,
  name,
  readOnly,
  size = 'small',
  style = defaultStyle,
  type = 'dashed',
  value,
  ...props
}: ListAddFieldProps) {
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<
    { initialCount?: number; maxCount?: number },
    unknown[]
  >(parentName, { initialCount }, { absoluteName: true })[0];

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <Button
      {...filterDOMProps(props)}
      disabled={!limitNotReached}
      icon={icon}
      onClick={() => {
        if (!readOnly) {
          parent.onChange(parent.value!.concat([cloneDeep(value)]));
        }
      }}
      size={size}
      style={style}
      type={type}
    />
  );
}

export default connectField<ListAddFieldProps>(ListAdd, {
  initialValue: false,
  kind: 'leaf',
});
