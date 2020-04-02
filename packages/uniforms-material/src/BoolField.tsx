import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import { connectField, filterDOMProps, Override } from 'uniforms';

import wrapField from './wrapField';

export type BoolFieldProps = Override<
  CheckboxProps | SwitchProps,
  {
    appearance?: 'checkbox' | 'switch';
    label?: string;
    legend?: string;
    onChange?: (value: any) => void;
    transform?: (label?: string) => string;
  }
>;

const Bool = (props: BoolFieldProps) => {
  const {
    appearance,
    disabled,
    inputRef,
    label,
    legend,
    name,
    onChange,
    transform,
    value,
  } = props;
  const SelectionControl =
    appearance === 'checkbox' || appearance === undefined ? Checkbox : Switch;
  const filteredProps = wrapField._filterDOMProps(filterDOMProps(props));

  return wrapField(
    { fullWidth: true, margin: 'dense', ...props, component: 'fieldset' },
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
              !disabled && onChange && onChange(event.target.checked)
            }
            ref={inputRef}
            value={name}
            {...filteredProps}
          />
        }
        label={transform ? transform(label) : label}
      />
    </FormGroup>,
  );
};

export default connectField(Bool);
