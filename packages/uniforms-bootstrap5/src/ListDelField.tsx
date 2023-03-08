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
  HTMLButtonElement,
  { removeIcon?: ReactNode }
>;

function ListDel({
  className,
  disabled,
  name,
  readOnly,
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

  disabled ||= readOnly || parent.minCount! >= parent.value!.length;
  function onAction() {
    if (!disabled) {
      const value = parent.value!.slice();
      value.splice(nameIndex, 1);
      parent.onChange(value);
    }
  }

  return (
    <button
      {...filterDOMProps(props)}
      className={classnames('btn btn-secondary btn-sm', className)}
      disabled={disabled}
      onClick={onAction}
      tabIndex={0}
      type="button"
    >
      {removeIcon}
    </button>
  );
}

ListDel.defaultProps = {
  removeIcon: <i className="octicon octicon-dash" />,
};

export default connectField<ListDelFieldProps>(ListDel, {
  initialValue: false,
  kind: 'leaf',
});
