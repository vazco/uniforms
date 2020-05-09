import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import { filterDOMProps, joinName, Override, useField } from 'uniforms';

export type ListAddFieldProps<T> = Override<
  HTMLProps<HTMLSpanElement>,
  {
    initialCount?: number;
    name: string;
    parent?: any;
    value?: T;
  }
>;

export default function ListAddField<T>(rawProps: ListAddFieldProps<T>) {
  const props = useField<ListAddFieldProps<T>, T>(rawProps.name, rawProps)[0];

  const nameParts = joinName(null, rawProps.name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, T[]>(parentName, {})[0];
  if (props.parent) Object.assign(parent, props.parent);

  const limitNotReached =
    !props.disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <i
      {...filterDOMProps(props)}
      className={classnames(
        'ui',
        props.className,
        limitNotReached ? 'link' : 'disabled',
        'fitted add icon',
      )}
      onClick={() => {
        if (limitNotReached)
          parent.onChange(parent.value!.concat([cloneDeep(props.value!)]));
      }}
    />
  );
}
