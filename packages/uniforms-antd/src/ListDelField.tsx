import Button, { ButtonProps } from 'antd/lib/button';
import React from 'react';
import { filterDOMProps, joinName, useField } from 'uniforms';

type ListDelProps<T> = {
  name: string;
  parent?: any;
  value?: T;
} & ButtonProps;

function ListDel<T>(rawProps: ListDelProps<T>) {
  const props = useField<ListDelProps<T>, T>(rawProps.name, rawProps, {
    initialValue: false,
  })[0];

  const nameParts = joinName(null, props.name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, T[]>(parentName, {})[0];
  if (rawProps.parent) Object.assign(parent, rawProps.parent);

  const fieldIndex = +nameParts[nameParts.length - 1];
  const limitNotReached =
    !props.disabled && !(parent.minCount! >= parent.value!.length);
  return (
    <Button
      disabled={!limitNotReached || rawProps.disabled}
      onClick={() => {
        if (limitNotReached) {
          const value = parent.value!.slice();
          value.splice(fieldIndex, 1);
          parent.onChange(value);
        }
      }}
      {...filterDOMProps(props)}
    />
  );
}

ListDel.defaultProps = {
  icon: 'delete',
  shape: 'circle-outline',
  size: 'small',
  type: 'ghost',
};

export default ListDel;
