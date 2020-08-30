import classnames from 'classnames';
import React, { ReactNode } from 'react';
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
  { removeIcon?: ReactNode }
>;

function ListDel({
  name,
  className,
  disabled,
  removeIcon,
  ...props
}: ListDelFieldProps) {
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
    <span
      {...filterDOMProps(props)}
      className={classnames('badge badge-pill', className)}
      onClick={() => {
        if (limitNotReached) {
          const value = parent.value!.slice();
          value.splice(nameIndex, 1);
          parent.onChange(value);
        }
      }}
    >
      {removeIcon}
    </span>
  );
}

ListDel.defaultProps = {
  removeIcon: <i className="octicon octicon-dash" />,
};

export default connectField(ListDel, { initialValue: false, kind: 'leaf' });
