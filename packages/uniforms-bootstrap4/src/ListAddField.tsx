import React from 'react';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import { connectField, filterDOMProps } from 'uniforms';

const ListAdd = ({
  addIcon,
  className,
  disabled,
  parent,
  value,
  ...props
}: {
  disabled?: boolean;
  parent?: any;
  value?: any;
  name: string;
  [key: string]: any;
}) => {
  const limitNotReached =
    !disabled && !(parent.maxCount <= parent.value.length);

  return (
    <div
      className={classnames('badge badge-pill float-right', className)}
      onClick={() =>
        limitNotReached &&
        parent.onChange(parent.value.concat([cloneDeep(value)]))
      }
      {...filterDOMProps(props)}
    >
      {addIcon}
    </div>
  );
};

ListAdd.defaultProps = { addIcon: <i className="octicon octicon-plus" /> };

export default connectField(ListAdd, {
  includeParent: true,
  initialValue: false,
});
