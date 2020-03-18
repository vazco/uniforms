import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';

const ListDel = ({
  disabled,
  icon,
  name,
  parent,
  ...props
}: {
  disabled?: boolean;
  icon: any;
  name: string;
  parent?: any;
}) => {
  const fieldIndex = +name.slice(1 + name.lastIndexOf('.'));
  const limitNotReached =
    !disabled && !(parent.minCount >= parent.value.length);

  return (
    <IconButton
      disabled={!limitNotReached}
      onClick={() =>
        limitNotReached &&
        parent.onChange(
          []
            .concat(parent.value.slice(0, fieldIndex))
            .concat(parent.value.slice(1 + fieldIndex)),
        )
      }
      {...filterDOMProps(props)}
    >
      {icon}
    </IconButton>
  );
};

ListDel.defaultProps = {
  icon: '-',
};

export default connectField(ListDel, { initialValue: false });
