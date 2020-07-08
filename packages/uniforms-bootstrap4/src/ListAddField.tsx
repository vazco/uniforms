import React, { ReactNode } from 'react';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import {
  connectField,
  filterDOMProps,
  HTMLFieldProps,
  joinName,
  useField,
} from 'uniforms';

export type ListAddFieldProps = HTMLFieldProps<
  unknown,
  HTMLDivElement,
  { addIcon?: ReactNode; initialCount?: number }
>;

function ListAdd({
  name,
  addIcon,
  className,
  disabled,
  value,
  ...props
}: ListAddFieldProps) {
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true },
  )[0];

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <div
      {...filterDOMProps(props)}
      className={classnames('badge badge-pill float-right', className)}
      onClick={() => {
        if (limitNotReached)
          parent.onChange(parent.value!.concat([cloneDeep(value)]));
      }}
    >
      {addIcon}
    </div>
  );
}

ListAdd.defaultProps = { addIcon: <i className="octicon octicon-plus" /> };

export default connectField(ListAdd, { initialValue: false, kind: 'leaf' });
