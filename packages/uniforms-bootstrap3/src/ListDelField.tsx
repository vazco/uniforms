import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import { filterDOMProps, joinName, useField } from 'uniforms';

type ListDelProps<T> = {
  parent?: any;
  name: string;
  className?: string;
  removeIcon?: any;
} & HTMLProps<HTMLDivElement>;

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
      className={classnames('badge', rawProps.className)}
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

ListDel.defaultProps = {
  removeIcon: <i className="glyphicon glyphicon-minus" />,
};

export default ListDel;
