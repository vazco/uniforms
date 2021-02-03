import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioMaterial, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import omit from 'lodash/omit';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type RadioFieldProps = FieldProps<
  string,
  RadioProps,
  {
    allowedValues?: string[];
    checkboxes?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    margin?: any;
    row?: boolean;
    transform?(value: string): string;
  }
>;

function Radio({
  allowedValues,
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
  transform,
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
      {allowedValues?.map(item => (
        <FormControlLabel
          control={
            <RadioMaterial
              {...omit(filterDOMProps(props), ['checkboxes', 'helperText'])}
            />
          }
          key={item}
          label={transform ? transform(item) : item}
          value={`${item}`}
        />
      ))}
    </RadioGroup>,
  );
}

export default connectField(Radio, { kind: 'leaf' });
