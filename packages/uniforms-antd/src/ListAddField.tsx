import Button, { ButtonProps } from 'antd/lib/button';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Override, filterDOMProps, joinName, useField } from 'uniforms';

export type ListAddFieldProps<T> = Override<
  ButtonProps,
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
    <Button
      // FIXME: filterDOMProps will remove value.
      {...(filterDOMProps(props) as Omit<typeof props, 'value'>)}
      disabled={!limitNotReached}
      onClick={() => {
        if (limitNotReached)
          parent.onChange(parent.value!.concat([cloneDeep(props.value!)]));
      }}
    />
  );
}

ListAddField.defaultProps = {
  icon: 'plus-square-o',
  size: 'small',
  style: { width: '100%' },
  type: 'dashed',
};
