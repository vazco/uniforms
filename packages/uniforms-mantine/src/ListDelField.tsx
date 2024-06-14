import { ActionIcon, ActionIconProps } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import React from 'react';
import {
  FieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListDelFieldProps = FieldProps<unknown, ActionIconProps>;

function ListDel({
  disabled,
  name,
  readOnly,
  icon = <IconTrash size="1rem" color="white" />,
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

  disabled ||= readOnly || parent.minCount! >= parent.value!.length;

  return (
    <ActionIcon
      mb="xs"
      {...filterDOMProps(props)}
      disabled={disabled}
      onClick={() => {
        const value = parent.value!.slice();
        value.splice(nameIndex, 1);
        parent.onChange(value);
      }}
    >
      {icon}
    </ActionIcon>
  );
}

export default connectField<ListDelFieldProps>(ListDel, {
  initialValue: false,
  kind: 'leaf',
});
