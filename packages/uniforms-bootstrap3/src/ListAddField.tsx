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

export type ListAddFieldProps = HTMLFieldProps<
  unknown,
  HTMLDivElement,
  { addIcon?: ReactNode; initialCount?: number }
>;

function ListAdd({
  addIcon,
  className,
  disabled,
  name,
  readOnly,
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

  function onAction(event: React.KeyboardEvent | React.MouseEvent) {
    if (
      limitNotReached &&
      !readOnly &&
      (!('key' in event) || event.key === 'Enter')
    ) {
      parent.onChange(parent.value!.concat([cloneDeep(value)]));
    }
  }

  return (
    <div
      {...filterDOMProps(props)}
      className={classnames('badge pull-right', className)}
      onClick={onAction}
      onKeyDown={onAction}
      role="button"
      tabIndex={0}
    >
      {addIcon}
    </div>
  );
}

ListAdd.defaultProps = {
  addIcon: <i className="glyphicon glyphicon-plus" />,
};

export default connectField(ListAdd, { initialValue: false, kind: 'leaf' });
