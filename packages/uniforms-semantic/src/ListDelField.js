import React from 'react';
import classnames from 'classnames';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const ListDel = ({className, disabled, name, parent, ...props}) => {
  const fieldIndex = +name.slice(1 + name.lastIndexOf('.'));
  const limitNotReached = !disabled && !(parent.minCount >= parent.value.length);

  return (
    <i
      {...filterDOMProps(props)}
      className={classnames('ui', className, limitNotReached ? 'link' : 'disabled', 'fitted close icon')}
      onClick={() =>
        limitNotReached &&
        parent.onChange([].concat(parent.value.slice(0, fieldIndex)).concat(parent.value.slice(1 + fieldIndex)))
      }
    />
  );
};

export default connectField(ListDel, {includeParent: true, initialValue: false});
