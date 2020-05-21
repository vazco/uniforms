import React, { HTMLProps } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import {
  Override,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListAddFieldProps = Override<
  Omit<HTMLProps<HTMLSpanElement>, 'onChange'>,
  { initialCount?: number; name: string; value: unknown }
>;

function ListAdd({ disabled, name, value, ...props }: ListAddFieldProps) {
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
    <span
      {...filterDOMProps(props)}
      onClick={() => {
        if (limitNotReached) {
          parent.onChange(parent.value!.concat([cloneDeep(value)]));
        }
      }}
    >
      +
    </span>
  );
}

export default connectField(ListAdd, { initialValue: false });
