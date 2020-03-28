import React, { HTMLProps } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { filterDOMProps, joinName, useField } from 'uniforms';

type ListAddProps<T> = {
  initialCount?: number;
  name: string;
  parent?: any;
  value?: T;
} & HTMLProps<HTMLSpanElement>;

export default function ListAdd<T>(rawProps: ListAddProps<T>) {
  const props = useField<ListAddProps<T>, T>(rawProps.name, rawProps, {
    initialValue: false,
  })[0];

  const parentName = joinName(joinName(null, props.name).slice(0, -1));
  const parent = useField<{ maxCount?: number }, T[]>(parentName, {})[0];
  if (rawProps.parent) Object.assign(parent, rawProps.parent);

  const limitNotReached =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    !props.disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <span
      {...filterDOMProps(props)}
      onClick={() => {
        if (limitNotReached)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          parent.onChange(parent.value!.concat([cloneDeep(props.value!)]));
      }}
    >
      +
    </span>
  );
}
