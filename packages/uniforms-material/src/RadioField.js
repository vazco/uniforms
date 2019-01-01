import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioMaterial from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import {Fragment} from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

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
}) =>
  wrapField(
    {...props, disabled, component: 'fieldset'},
    <Fragment>
      {label && (
        <FormLabel component="legend" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <RadioGroup
        id={id}
        name={name}
        onChange={event => disabled || onChange(event.target.value)}
        ref={inputRef}
        value={value}
      >
        {allowedValues.map(item => (
          <FormControlLabel
            control={<RadioMaterial {...filterDOMProps(props)} />}
            key={item}
            label={transform ? transform(item) : item}
            value={`${item}`}
          />
        ))}
      </RadioGroup>
    </Fragment>
  );

Radio.defaultProps = {
  fullWidth: true,
  margin: 'normal'
};

export default connectField(Radio);
