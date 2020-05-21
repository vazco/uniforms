import React, { HTMLProps } from 'react';
import {
  Override,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListDelFieldProps = Override<
  Omit<HTMLProps<HTMLSpanElement>, 'onChange'>,
  { name: string }
>;

function ListDel({ disabled, name, ...props }: ListDelFieldProps) {
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
    <span
      {...filterDOMProps(props)}
      onClick={() => {
        if (limitNotReached) {
          const value = parent.value!.slice();
          value.splice(nameIndex, 1);
          parent.onChange(value);
        }
      }}
    >
      -
    </span>
  );
}

export default connectField(ListDel, { initialValue: false });
