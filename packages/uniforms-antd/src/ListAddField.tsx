import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined';
import Button, { ButtonProps } from 'antd/lib/button';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import {
  ConnectedField,
  FieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListAddFieldProps = FieldProps<unknown, ButtonProps>;

const defaultStyle = { width: '100%' };

function ListAdd({
  disabled,
  icon = <PlusSquareOutlined />,
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
  const parent = useField<{ maxCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true },
  )[0];

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

// There's no way to tell TypeScript NOT TO expand the type alias. Creating a
// local type helps, at least in the current version.
// https://github.com/microsoft/TypeScript/issues/34556
type ListAddFieldType = ConnectedField<ListAddFieldProps>;

export default connectField<ListAddFieldProps>(ListAdd, {
  initialValue: false,
  kind: 'leaf',
}) as ListAddFieldType;
