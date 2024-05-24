import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import {
  FieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';
import { Button, ButtonProps } from '@mantine/core';
import { IconSquarePlus } from '@tabler/icons-react';

export type ListAddFieldProps = FieldProps<
  unknown,
  ButtonProps,
  { icon?: JSX.Element; reversed?: boolean }
>;

function ListAdd({
  disabled,
  icon = <IconSquarePlus size="1rem" />,
  name,
  readOnly,
  size = 'sm',
  value,
  variant = 'outline',
  reversed = false,
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
      mb="xs"
      {...filterDOMProps(props)}
      fullWidth
      disabled={!limitNotReached}
      onClick={() => {
        if (!readOnly) {
          parent.onChange(
            reversed
              ? [cloneDeep(value)].concat(parent.value!)
              : parent.value!.concat([cloneDeep(value)]),
          );
        }
      }}
      variant={variant ?? 'outline'}
      size={size ?? 'sm'}
    >
      {icon}
    </Button>
  );
}

export default connectField<ListAddFieldProps>(ListAdd, {
  initialValue: false,
  kind: 'leaf',
});
