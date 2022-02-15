import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { useTheme } from '@mui/material/styles';
import omit from 'lodash/omit';
import React, { Ref, isValidElement } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type BoolFieldProps = FieldProps<
  boolean,
  CheckboxProps | SwitchProps,
  {
    appearance?: 'checkbox' | 'switch';
    fullWidth?: boolean;
    helperText?: string;
    legend?: string;
    margin?: 'dense' | 'normal' | 'none';
    transform?: (label: string) => string;
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
    transform,
    value,
  } = props;
  const theme = useTheme();
  const formControlThemeProps = theme.components?.MuiFormControl?.defaultProps;
  const SelectionControl =
    appearance === 'checkbox' || appearance === undefined ? Checkbox : Switch;

  const fieldLabel = transform ? transform(label as string) : label;
  return wrapField(
    {
      ...(formControlThemeProps?.fullWidth === undefined && {
        fullWidth: true,
      }),
      ...(formControlThemeProps?.margin === undefined && { margin: 'dense' }),
      ...props,
      component: 'fieldset',
    },
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
              onChange(event.target.checked)
            }
            ref={inputRef as Ref<HTMLButtonElement>}
            value={name}
            {...omit(filterDOMProps(props), ['helperText', 'fullWidth'])}
          />
        }
        label={isValidElement(fieldLabel) ? fieldLabel : ''}
      />
    </FormGroup>,
  );
}

export default connectField<BoolFieldProps>(Bool, { kind: 'leaf' });
