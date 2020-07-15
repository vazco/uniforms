import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import React, { ReactNode } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import {
  FieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListAddFieldProps = FieldProps<
  unknown,
  IconButtonProps,
  {
    fullWidth?: FormControlProps['fullWidth'];
    icon?: ReactNode;
    initialCount?: number;
    margin?: FormControlProps['margin'];
    variant?: FormControlProps['variant'];
  }
>;

function ListAdd({
  disabled,
  fullWidth = true,
  icon = '+',
  margin = 'dense',
  name,
  value,
  variant,
  ...props
}: ListAddFieldProps) {
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true },
  )[0];

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <FormControl fullWidth={fullWidth} margin={margin} variant={variant}>
      <IconButton
        {...filterDOMProps(props)}
        disabled={!limitNotReached}
        onClick={() => {
          parent.onChange(parent.value!.concat([cloneDeep(value)]));
        }}
      >
        {icon}
      </IconButton>
    </FormControl>
  );
}

export default connectField(ListAdd, { initialValue: false, kind: 'leaf' });
