import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import React from 'react';
import { filterDOMProps, joinName, useField } from 'uniforms';

type ListDelProps<T> = {
  disabled?: boolean;
  icon: any;
  parent?: any;
  name: string;
  initialCount?: number;
  value?: T;
} & IconButtonProps;

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
    <IconButton
      disabled={!limitNotReached}
      onClick={() => {
        if (limitNotReached) {
          const value = parent.value!.slice();
          value.splice(fieldIndex, 1);
          parent.onChange(value);
        }
      }}
      {...filterDOMProps(props)}
    >
      {rawProps.icon}
    </IconButton>
  );
}

ListDel.defaultProps = {
  icon: '-',
};

export default ListDel;
