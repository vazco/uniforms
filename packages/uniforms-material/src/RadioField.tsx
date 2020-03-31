import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioMaterial, {
  RadioProps as RadioMaterialProps,
} from '@material-ui/core/Radio';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type RadioFieldProps = {
  allowedValues: string[];
  checkboxes?: boolean;
  onChange: (string) => void;
  transform?: (string?: string) => string;
  label?: string;
} & RadioMaterialProps;

const Radio = ({
  allowedValues,
  checkboxes, // eslint-disable-line no-unused-vars
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  transform,
  value,
  ...props
}: RadioFieldProps) => {
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
      value={value}
    >
      {allowedValues.map(item => (
        <FormControlLabel
          control={<RadioMaterial {...filteredProps} />}
          key={item}
          label={transform ? transform(item) : item}
          value={`${item}`}
        />
      ))}
    </RadioGroup>,
  );
};

export default connectField<RadioFieldProps>(Radio);
