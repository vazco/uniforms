import { Button, ButtonProps } from '@mantine/core';
import { IconSquarePlus } from '@tabler/icons-react';
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
    !disabled && !(parent.maxCount! <= (parent.value?.length ?? 0));

  return (
    <Button
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

// There's no way to tell TypeScript NOT TO expand the type alias. Creating a
// local type helps, at least in the current version.
// https://github.com/microsoft/TypeScript/issues/34556
type ListAddFieldType = ConnectedField<ListAddFieldProps>;

export default connectField<ListAddFieldProps>(ListAdd, {
  initialValue: false,
  kind: 'leaf',
}) as ListAddFieldType;
