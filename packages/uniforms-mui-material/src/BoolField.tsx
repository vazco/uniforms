import type { PropTypes } from '@material-ui/core';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import useTheme from '@material-ui/core/styles/useTheme';
import omit from 'lodash/omit';
import React, { Ref } from 'react';
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
    margin?: PropTypes.Margin;
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
  const formControlThemeProps = theme.props?.MuiFormControl;
  const SelectionControl =
    appearance === 'checkbox' || appearance === undefined ? Checkbox : Switch;

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
        label={transform ? transform(label as string) : label}
      />
    </FormGroup>,
  );
}

export default connectField<BoolFieldProps>(Bool, { kind: 'leaf' });
