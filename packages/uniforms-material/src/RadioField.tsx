import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioMaterial from '@material-ui/core/Radio';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

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
}) => {
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

Radio.defaultProps = {
  fullWidth: true,
  margin: 'dense',
};

export default connectField(Radio);
