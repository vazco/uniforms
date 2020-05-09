import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import { Override, filterDOMProps, joinName, useField } from 'uniforms';

export type ListAddFieldProps<T> = Override<
  HTMLProps<HTMLDivElement>,
  {
    addIcon?: any;
    initialCount?: number;
    name: string;
    parent?: any;
    value?: T;
  }
>;

export default function ListAddField<T>(rawProps: ListAddFieldProps<T>) {
  const {
    addIcon,
    className,
    disabled,
    parent: parentFromProps,
    value,
    ...props
  } = useField<ListAddFieldProps<T>, T>(rawProps.name, rawProps)[0];

  const nameParts = joinName(null, rawProps.name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, T[]>(parentName, {})[0];
  if (parentFromProps) Object.assign(parent, parentFromProps);

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <div
      {...filterDOMProps(props)}
      className={classnames('badge badge-pill float-right', className)}
      onClick={() => {
        if (limitNotReached)
          parent.onChange(parent.value!.concat([cloneDeep(value!)]));
      }}
    >
      {addIcon}
    </div>
  );
}

ListAddField.defaultProps = { addIcon: <i className="octicon octicon-plus" /> };
