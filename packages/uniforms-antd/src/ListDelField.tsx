import Button, {
  ButtonProps,
  ButtonType,
  ButtonSize,
  ButtonShape,
} from 'antd/lib/button';
import React from 'react';
import {
  Override,
  filterDOMProps,
  joinName,
  useField,
  connectField,
} from 'uniforms';

export type ListDelFieldProps = Override<
  Omit<ButtonProps, 'onChange'>,
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
    <Button
      // FIXME: filterDOMProps will remove value.
      {...(filterDOMProps(props) as Omit<typeof props, 'value'>)}
      disabled={!limitNotReached}
      onClick={() => {
        if (limitNotReached) {
          const value = parent.value!.slice();
          value.splice(nameIndex, 1);
          parent.onChange(value);
        }
      }}
    />
  );
}

ListDel.defaultProps = {
  icon: 'delete',
  shape: 'circle-outline' as ButtonShape,
  size: 'small' as ButtonSize,
  type: 'ghost' as ButtonType,
};

export default connectField(ListDel);
