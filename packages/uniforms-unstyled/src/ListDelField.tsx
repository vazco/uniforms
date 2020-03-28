import React, { HTMLProps } from 'react';
import { filterDOMProps, joinName, useField } from 'uniforms';

type ListDelProps<T> = {
  name: string;
  parent?: any;
  value?: T;
} & HTMLProps<HTMLSpanElement>;

export default function ListDel<T>(rawProps: ListDelProps<T>) {
  const props = useField<ListDelProps<T>, T>(rawProps.name, rawProps, {
    initialValue: false,
  })[0];

  const nameParts = joinName(null, props.name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, T[]>(parentName, {})[0];
  if (rawProps.parent) Object.assign(parent, rawProps.parent);

  const fieldIndex = +nameParts[nameParts.length - 1];
  const limitNotReached =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    !props.disabled && !(parent.minCount! >= parent.value!.length);

  return (
    <span
      {...filterDOMProps(props)}
      onClick={() => {
        if (limitNotReached) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const value = parent.value!.slice();
          value.splice(fieldIndex, 1);
          parent.onChange(value);
        }
      }}
    >
      -
    </span>
  );
}
