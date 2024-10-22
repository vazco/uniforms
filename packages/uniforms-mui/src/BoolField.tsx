import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import omit from 'lodash/omit';
import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

// Create a new type excluding "large" from the size property in SwitchProps
type ModifiedSwitchProps = Omit<SwitchProps, 'size'> & {
  size?: 'small' | 'medium'; // Allow only 'small' and 'medium'
};

// Update BoolFieldProps to include modified props
export type BoolFieldProps = FieldProps<
  boolean,
  CheckboxProps | ModifiedSwitchProps, // Use modified SwitchProps here
  {
    appearance?: 'checkbox' | 'switch';
    fullWidth?: boolean;
    helperText?: string;
    legend?: string;
    margin?: 'dense' | 'normal' | 'none';
  }
>;

function Bool(props: BoolFieldProps) {
  const {
    appearance,
    disabled,
    inputRef,
    label,
    legend,
    name,
    onChange,
    readOnly,
    value,
    size,
  } = props;

  const SelectionControl =
    appearance === 'checkbox' || appearance === undefined ? Checkbox : Switch;

  const validSize: 'small' | 'medium' | undefined =
    size === 'large' ? undefined : size;

  return wrapField(
    { fullWidth: true, ...props },
    legend && (
      <FormLabel component="legend" htmlFor={name}>
        {legend}
      </FormLabel>
    ),
    <FormGroup>
      <FormControlLabel
        control={
          <SelectionControl
            checked={!!value}
            name={name}
            onChange={event =>
              !disabled &&
              !readOnly &&
              onChange &&
              onChange((event.target as HTMLInputElement).checked)
            }
            ref={inputRef as Ref<HTMLButtonElement>}
            value={name}
            size={validSize}
            {...omit(filterDOMProps(props), [
              'helperText',
              'fullWidth',
              'size',
            ])}
          />
        }
        label={label}
      />
    </FormGroup>,
  );
}

export default connectField<BoolFieldProps>(Bool, { kind: 'leaf' });
