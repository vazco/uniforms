import React from 'react';
import {
  HTMLFieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListDelFieldProps = HTMLFieldProps<unknown, HTMLSpanElement>;

function ListDel({ disabled, name, readOnly, ...props }: ListDelFieldProps) {
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
    // TODO[jsx-a11y]
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <span
      {...filterDOMProps(props)}
      onClick={() => {
        if (limitNotReached && !readOnly) {
          const value = parent.value!.slice();
          value.splice(nameIndex, 1);
          parent.onChange(value);
        }
      }}
    >
      -
    </span>
  );
}

export default connectField(ListDel, { initialValue: false, kind: 'leaf' });
