import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import React, { ReactNode } from 'react';
import {
  connectField,
  filterDOMProps,
  HTMLFieldProps,
  joinName,
  useField,
} from 'uniforms';

export type ListAddFieldProps = HTMLFieldProps<
  unknown,
  HTMLButtonElement,
  { addIcon?: ReactNode }
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

  disabled ||= readOnly || parent.maxCount! <= parent.value!.length;
  function onAction() {
    if (!disabled) {
      parent.onChange(parent.value!.concat([cloneDeep(value)]));
    }
  }

  return (
    <button
      {...filterDOMProps(props)}
      className={classnames('btn btn-secondary btn-sm float-end', className)}
      disabled={disabled}
      onClick={onAction}
      tabIndex={0}
      type="button"
    >
      {addIcon}
    </button>
  );
}

ListAdd.defaultProps = { addIcon: <i className="octicon octicon-plus" /> };

export default connectField<ListAddFieldProps>(ListAdd, {
  initialValue: false,
  kind: 'leaf',
});
