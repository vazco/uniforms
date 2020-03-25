import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import { filterDOMProps, joinName, useField } from 'uniforms';

type ListAddProps<T> = {
  name: string;
  parent?: any;
  value?: T;
  addIcon?: any;
} & HTMLProps<HTMLDivElement>;

function ListAdd<T>(rawProps: ListAddProps<T>) {
  const props = useField<ListAddProps<T>, T>(rawProps.name, rawProps, {
    initialValue: false,
  })[0];

  const parentName = joinName(joinName(null, props.name).slice(0, -1));
  const parent = useField<{ maxCount?: number }, T[]>(parentName, {})[0];
  if (rawProps.parent) Object.assign(parent, rawProps.parent);

  const limitNotReached =
    !props.disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <div
      className={classnames('badge badge-pill float-right', rawProps.className)}
      onClick={() => {
        if (limitNotReached)
          parent.onChange(parent.value!.concat([cloneDeep(props.value!)]));
      }}
      {...filterDOMProps(props)}
    >
      {rawProps.addIcon}
    </div>
  );
}

ListAdd.defaultProps = { addIcon: <i className="octicon octicon-plus" /> };

export default ListAdd;
