import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Override, filterDOMProps, joinName, useField } from 'uniforms';

export type ListAddFieldProps<T> = Override<
  IconButtonProps,
  {
    icon?: any;
    initialCount?: number;
    name: string;
    parent?: any;
    value?: T;
  } & Pick<FormControlProps, 'fullWidth' | 'margin' | 'variant'>
>;

export default function ListAddField<T>(rawProps: ListAddFieldProps<T>) {
  const {
    disabled,
    fullWidth,
    icon,
    margin,
    parent: parentFromProps,
    value,
    variant,
    ...props
  } = useField<ListAddFieldProps<T>, T>(rawProps.name, rawProps)[0];

  const nameParts = joinName(null, rawProps.name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, T[]>(parentName, {})[0];
  if (parentFromProps) Object.assign(parent, parentFromProps);

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <FormControl fullWidth={fullWidth} margin={margin} variant={variant}>
      <IconButton
        {...filterDOMProps(props)}
        disabled={!limitNotReached}
        onClick={() => {
          if (limitNotReached)
            parent.onChange(parent.value!.concat([cloneDeep(value!)]));
        }}
      >
        {icon}
      </IconButton>
    </FormControl>
  );
}

ListAddField.defaultProps = {
  fullWidth: true,
  icon: '+',
  margin: 'dense',
};
