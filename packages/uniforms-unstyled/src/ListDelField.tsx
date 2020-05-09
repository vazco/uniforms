import React, { HTMLProps } from 'react';
import { Override, filterDOMProps, joinName, useField } from 'uniforms';

export type ListDelFieldProps<T> = Override<
  HTMLProps<HTMLSpanElement>,
  {
    name: string;
    parent?: any;
  }
>;

export default function ListDelField<T>(rawProps: ListDelFieldProps<T>) {
  const props = useField<ListDelFieldProps<T>, T>(rawProps.name, rawProps)[0];

  const nameParts = joinName(null, rawProps.name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, T[]>(parentName, {})[0];
  if (props.parent) Object.assign(parent, props.parent);

  const limitNotReached =
    !props.disabled && !(parent.minCount! >= parent.value!.length);

  return (
    <span
      {...filterDOMProps(props)}
      onClick={() => {
        if (limitNotReached) {
          const value = parent.value!.slice();
          value.splice(+nameParts[nameParts.length - 1], 1);
          parent.onChange(value);
        }
      }}
    >
      -
    </span>
  );
}
