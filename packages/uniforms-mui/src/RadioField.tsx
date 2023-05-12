import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioMaterial, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import omit from 'lodash/omit';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import type { Option } from './types';
import wrapField from './wrapField';

export type RadioFieldProps = FieldProps<
  string,
  RadioProps,
  {
    options?: Option<string>[];
    checkboxes?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    margin?: 'dense' | 'normal' | 'none';
    row?: boolean;
  }
>;

function Radio({
  options,
  disabled,
  fullWidth = true,
  id,
  inputRef,
  label,
  margin = 'dense',
  name,
  onChange,
  readOnly,
  row,
  value,
  ...props
}: RadioFieldProps) {
  return wrapField(
    { ...props, component: 'fieldset', disabled, fullWidth, margin },
    label && (
      <FormLabel component="legend" htmlFor={name}>
        {label}
      </FormLabel>
    ),
    <RadioGroup
      id={id}
      name={name}
      onChange={(event: any) =>
        disabled || readOnly || onChange(event.target.value)
      }
      ref={inputRef}
      row={row}
      value={value ?? ''}
    >
      {options?.map(option => (
        <FormControlLabel
          control={
            <RadioMaterial
              {...omit(filterDOMProps(props), ['checkboxes', 'helperText'])}
            />
          }
          key={option.key ?? option.value}
          label={option.label ?? option.value}
          value={`${option.value}`}
        />
      ))}
    </RadioGroup>,
  );
}

export default connectField<RadioFieldProps>(Radio, { kind: 'leaf' });
