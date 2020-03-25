import React, { HTMLProps, ReactElement } from 'react';
import classnames from 'classnames';
import { filterDOMProps, joinName, useField } from 'uniforms';

type ListDelProps<T> = {
  name: string;
  parent?: any;
  removeIcon?: any;
  value?: T;
} & HTMLProps<HTMLSpanElement>;

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
    <span
      className={classnames('badge badge-pill', rawProps.className)}
      onClick={() => {
        if (limitNotReached) {
          const value = parent.value!.slice();
          value.splice(fieldIndex, 1);
          parent.onChange(value);
        }
      }}
      {...filterDOMProps(props)}
    >
      {rawProps.removeIcon}
    </span>
  );
}

ListDel.defaultProps = { removeIcon: <i className="octicon octicon-dash" /> };

export default ListDel;
