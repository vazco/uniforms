import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { connectField, filterDOMProps } from 'uniforms';

const ListAdd = ({
  disabled,
  fullWidth,
  icon,
  margin,
  parent,
  value,
  variant,
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
    <FormControl fullWidth={!!fullWidth} margin={margin} variant={variant}>
      <IconButton
        disabled={!limitNotReached}
        onClick={() =>
          limitNotReached &&
          parent.onChange(parent.value.concat([cloneDeep(value)]))
        }
        {...filterDOMProps(props)}
      >
        {icon}
      </IconButton>
    </FormControl>
  );
};

ListAdd.defaultProps = {
  fullWidth: true,
  icon: '+',
  margin: 'dense',
};

export default connectField(ListAdd, { initialValue: false });
