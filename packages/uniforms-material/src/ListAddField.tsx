import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import React, { ReactNode } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import {
  Override,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListAddFieldProps = Override<
  IconButtonProps,
  {
    fullWidth?: FormControlProps['fullWidth'];
    icon: ReactNode;
    initialCount?: number;
    margin?: FormControlProps['margin'];
    name: string;
    value: unknown;
    variant?: FormControlProps['variant'];
  }
>;

function ListAdd({
  disabled,
  fullWidth,
  icon,
  margin,
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

ListAdd.defaultProps = {
  fullWidth: true,
  icon: '+',
  margin: 'dense' as 'dense',
};

export default connectField(ListAdd, { initialValue: false, kind: 'leaf' });
