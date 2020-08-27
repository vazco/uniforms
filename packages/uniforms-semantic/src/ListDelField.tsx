import classnames from 'classnames';
import React from 'react';
import {
  HTMLFieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListDelFieldProps = HTMLFieldProps<
  unknown,
  HTMLSpanElement,
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

export default connectField(ListDel, { initialValue: false, kind: 'leaf' });
