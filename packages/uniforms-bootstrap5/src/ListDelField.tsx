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
  HTMLSpanElement,
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

  const limitNotReached =
    !disabled && !(parent.minCount! >= parent.value!.length);

  function onAction(
    event:
      | React.KeyboardEvent<HTMLSpanElement>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) {
    if (
      limitNotReached &&
      !readOnly &&
      (!('key' in event) || event.key === 'Enter')
    ) {
      const value = parent.value!.slice();
      value.splice(nameIndex, 1);
      parent.onChange(value);
    }
  }

  return (
    <span
      {...filterDOMProps(props)}
      className={classnames('badge rounded-pill', className)}
      onClick={onAction}
      onKeyDown={onAction}
      role="button"
      tabIndex={0}
    >
      {removeIcon}
    </span>
  );
}

ListDel.defaultProps = {
  removeIcon: <i className="octicon octicon-dash" />,
};

export default connectField<ListDelFieldProps>(ListDel, {
  initialValue: false,
  kind: 'leaf',
});
