import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import omit from 'lodash/omit';
import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type BoolFieldProps = FieldProps<
  boolean,
  CheckboxProps | SwitchProps,
  {
    appearance?: 'checkbox' | 'switch';
    helperText?: string;
    legend?: string;
    transform?(label: string): string;
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
  const SelectionControl =
    appearance === 'checkbox' || appearance === undefined ? Checkbox : Switch;

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
              !disabled &&
              !readOnly &&
              onChange &&
              onChange(event.target.checked)
            }
            ref={inputRef as Ref<HTMLButtonElement>}
            value={name}
            {...omit(filterDOMProps(props), ['helperText'])}
          />
        }
        label={transform ? transform(label as string) : label}
      />
    </FormGroup>,
  );
}

export default connectField(Bool, { kind: 'leaf' });
