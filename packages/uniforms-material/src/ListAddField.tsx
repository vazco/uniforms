import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { filterDOMProps, joinName, Override, useField } from 'uniforms';
import omit from 'lodash/omit';

export type ListAddFieldProps<T> = Override<
  IconButtonProps,
  {
    initialCount?: number;
    name: string;
    parent?: any;
    icon?: any;
    value?: T;
  } & Pick<FormControlProps, 'fullWidth' | 'margin' | 'variant'>
>;

function ListAdd<T>(rawProps: ListAddFieldProps<T>) {
  const props = useField<ListAddFieldProps<T>, T>(
    rawProps.name,
    omit(rawProps, 'fullWidth'),
    {
      initialValue: false,
    },
  )[0];

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
        {...filterDOMProps(omit(props, 'value'))}
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
