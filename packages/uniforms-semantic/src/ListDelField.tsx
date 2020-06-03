import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import {
  Override,
  filterDOMProps,
  joinName,
  useField,
  connectField,
} from 'uniforms';

export type ListDelFieldProps = Override<
  Omit<HTMLProps<HTMLSpanElement>, 'onChange'>,
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
    <i
      {...filterDOMProps(props)}
      className={classnames(
        'ui',
        props.className,
        limitNotReached ? 'link' : 'disabled',
        'fitted close icon',
      )}
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

export default connectField(ListDel, { initialValue: false });
