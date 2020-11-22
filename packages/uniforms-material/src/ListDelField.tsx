import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import React, { ReactNode } from 'react';
import {
  FieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

import wrapField from './wrapField';

export type ListDelFieldProps = FieldProps<
  unknown,
  IconButtonProps,
  { icon?: ReactNode }
>;

function ListDel({ disabled, icon = '-', name, ...props }: ListDelFieldProps) {
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
    <IconButton
      {...wrapField.__filterProps(filterDOMProps(props))}
      disabled={!limitNotReached}
      onClick={() => {
        const value = parent.value!.slice();
        value.splice(nameIndex, 1);
        parent.onChange(value);
      }}
    >
      {icon}
    </IconButton>
  );
}

export default connectField(ListDel, { initialValue: false, kind: 'leaf' });
