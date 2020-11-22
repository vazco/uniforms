import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import React, { ReactNode } from 'react';
import {
  HTMLFieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

import wrapField from './wrapField';

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
      {...wrapField.__filterProps(filterDOMProps(props))}
      className={classnames('badge pull-right', className)}
      onClick={() => {
        if (limitNotReached) {
          parent.onChange(parent.value!.concat([cloneDeep(value)]));
        }
      }}
    >
      {addIcon}
    </div>
  );
}

ListAdd.defaultProps = {
  addIcon: <i className="glyphicon glyphicon-plus" />,
};

export default connectField(ListAdd, { initialValue: false, kind: 'leaf' });
