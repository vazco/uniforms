import Button, { ButtonProps } from 'antd/lib/button';
import React from 'react';
import { Override, filterDOMProps, joinName, useField } from 'uniforms';

export type ListDelFieldProps<T> = Override<
  ButtonProps,
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
    <Button
      // FIXME: filterDOMProps will remove value.
      {...(filterDOMProps(props) as Omit<typeof props, 'value'>)}
      disabled={!limitNotReached}
      onClick={() => {
        if (limitNotReached) {
          const value = parent.value!.slice();
          value.splice(+nameParts[nameParts.length - 1], 1);
          parent.onChange(value);
        }
      }}
    />
  );
}

ListDelField.defaultProps = {
  icon: 'delete',
  shape: 'circle-outline',
  size: 'small',
  type: 'ghost',
};
