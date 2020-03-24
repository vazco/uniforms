import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { connectField, filterDOMProps, joinName, useField } from 'uniforms';

type ListAddProps<T> = {
  initialCount?: number;
  name: string;
  parent?: any;
  icon?: any;
  value?: T;
} & IconButtonProps &
  Pick<FormControlProps, 'fullWidth' | 'margin' | 'variant'>;

function ListAdd<T>(rawProps: ListAddProps<T>) {
  const props = useField<ListAddProps<T>, T>(rawProps.name, rawProps, {
    initialValue: false,
  })[0];

  const parentName = joinName(joinName(null, props.name).slice(0, -1));
  const parent = useField<{ maxCount?: number }, T[]>(parentName, {})[0];
  if (rawProps.parent) Object.assign(parent, rawProps.parent);

  const limitNotReached =
    !props.disabled && !(parent.maxCount! <= parent.value!.length);
  return (
    <FormControl
      fullWidth={rawProps.fullWidth}
      margin={rawProps.margin}
      variant={rawProps.variant}
    >
      <IconButton
        disabled={!limitNotReached}
        onClick={() => {
          if (limitNotReached)
            parent.onChange(parent.value!.concat([cloneDeep(props.value!)]));
        }}
        {...filterDOMProps(props)}
      >
        {rawProps.icon}
      </IconButton>
    </FormControl>
  );
}

ListAdd.defaultProps = {
  fullWidth: true,
  icon: '+',
  margin: 'dense',
};

export default ListAdd;
