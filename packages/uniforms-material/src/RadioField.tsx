import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioMaterial, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { ReactNode } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type RadioFieldProps = FieldProps<
  string,
  RadioProps,
  {
    allowedValues?: string[];
    checkboxes?: boolean;
    helperText?: string;
    transform?(value: string): string;
  }
>;

function Radio({
  allowedValues,
  checkboxes,
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  transform,
  value,
  ...props
}: RadioFieldProps) {
  const filteredProps = wrapField._filterDOMProps(filterDOMProps(props));

  return wrapField(
    { ...props, disabled, component: 'fieldset' },
    label && (
      <FormLabel component="legend" htmlFor={name}>
        {label}
      </FormLabel>
    ),
    <RadioGroup
      id={id}
      name={name}
      onChange={(event: any) => disabled || onChange(event.target.value)}
      ref={inputRef}
      value={value ?? ''}
    >
      {allowedValues?.map(item => (
        <FormControlLabel
          control={<RadioMaterial {...filteredProps} />}
          key={item}
          label={transform ? transform(item) : item}
          value={`${item}`}
        />
      ))}
    </RadioGroup>,
  );
}

// FIXME: wrapField is not typed correctly.
Radio.defaultProps = {
  fullWidth: true,
  margin: 'dense',
} as any;

export default connectField(Radio, { kind: 'leaf' });
