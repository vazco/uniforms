import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import SelectMaterial from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

import wrapField from './wrapField';

const xor = (item, array) => {
  const index = array.indexOf(item);
  if (index === -1) {
    return array.concat([item]);
  }

  return array.slice(0, index).concat(array.slice(index + 1));
};

const renderSelect = ({
  allowedValues,
  disabled,
  fieldType,
  id,
  inputProps,
  label,
  labelProps,
  name,
  native,
  onChange,
  placeholder,
  required,
  transform,
  value,
  ...props
}) => {
  const Item = native ? 'option' : MenuItem;

  return wrapField(
    {...props, component: undefined, disabled, required},
    label && (
      <InputLabel htmlFor={name} shrink={!!placeholder || !!value} {...labelProps}>
        {label}
      </InputLabel>
    ),
    <SelectMaterial
      displayEmpty={!!placeholder}
      inputProps={{name, id, ...inputProps}}
      multiple={fieldType === Array || undefined}
      native={native}
      onChange={event => disabled || onChange(event.target.value)}
      value={native && !value ? '' : value}
      {...filterDOMProps(props)}
    >
      {!!placeholder && (
        <Item value="" disabled={!!required}>
          {placeholder}
        </Item>
      )}
      {allowedValues.map(value => (
        <Item key={value} value={value}>
          {transform ? transform(value) : value}
        </Item>
      ))}
    </SelectMaterial>
  );
};

const renderCheckboxes = ({
  allowedValues,
  appearance,
  disabled,
  error,
  errorMessage,
  fieldType,
  id,
  inputRef,
  label,
  legend,
  name,
  onChange,
  showInlineError,
  transform,
  value,
  ...props
}) => {
  let children;

  if (fieldType !== Array) {
    children = (
      <RadioGroup
        id={id}
        name={name}
        onChange={event => disabled || onChange(event.target.value)}
        ref={inputRef}
        value={value}
      >
        {allowedValues.map(item => (
          <FormControlLabel
            control={<Radio id={`${id}-${item}`} {...filterDOMProps(props)} />}
            key={item}
            label={transform ? transform(item) : item}
            value={item}
          />
        ))}
        {showInlineError && error && <FormHelperText>{errorMessage}</FormHelperText>}
      </RadioGroup>
    );
  } else {
    const SelectionControl = appearance === 'checkbox' ? Checkbox : Switch;

    children = (
      <FormGroup id={id}>
        {allowedValues.map(item => (
          <FormControlLabel
            control={
              <SelectionControl
                checked={value.includes(item)}
                id={`${id}-${item}`}
                name={name}
                onChange={() => disabled || onChange(xor(item, value))}
                ref={inputRef}
                value={props.name}
                {...filterDOMProps(props)}
              />
            }
            key={item}
            label={transform ? transform(item) : item}
          />
        ))}
      </FormGroup>
    );
  }

  return wrapField(
    {...props, component: 'fieldset', disabled, error, errorMessage, showInlineError},
    (legend || label) && <FormLabel component="legend">{legend || label}</FormLabel>,
    children
  );
};

const Select = ({checkboxes, ...props}) => (checkboxes ? renderCheckboxes(props) : renderSelect(props));
Select.defaultProps = {
  appearance: 'checkbox',
  fullWidth: true,
  margin: 'normal'
};

export default connectField(Select);
