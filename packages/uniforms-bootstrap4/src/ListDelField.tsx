import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import { Override, filterDOMProps, joinName, useField } from 'uniforms';

export type ListDelFieldProps<T> = Override<
  HTMLProps<HTMLSpanElement>,
  {
    name: string;
    parent?: any;
    removeIcon?: any;
  }
>;

export default function ListDelField<T>(rawProps: ListDelFieldProps<T>) {
  const {
    className,
    disabled,
    parent: parentFromProps,
    removeIcon,
    ...props
  } = useField<ListDelFieldProps<T>, T>(rawProps.name, rawProps)[0];

  const nameParts = joinName(null, rawProps.name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, T[]>(parentName, {})[0];
  if (parentFromProps) Object.assign(parent, parentFromProps);

  const limitNotReached =
    !disabled && !(parent.minCount! >= parent.value!.length);

  return (
    <span
      {...filterDOMProps(props)}
      className={classnames('badge badge-pill', className)}
      onClick={() => {
        if (limitNotReached) {
          const value = parent.value!.slice();
          value.splice(+nameParts[nameParts.length - 1], 1);
          parent.onChange(value);
        }
      }}
    >
      {removeIcon}
    </span>
  );
}

ListDelField.defaultProps = {
  removeIcon: <i className="octicon octicon-dash" />,
};
