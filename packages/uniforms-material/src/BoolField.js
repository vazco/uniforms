import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

import wrapField from './wrapField';

const Bool = ({appearance, disabled, inputRef, label, legend, name, onChange, transform, value, ...props}) => {
  const SelectionControl = appearance === 'checkbox' ? Checkbox : Switch;

  return wrapField(
    {...props, component: 'fieldset', disabled},
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
            onChange={event => disabled || onChange(event.target.checked)}
            ref={inputRef}
            value={name}
            {...filterDOMProps(props)}
          />
        }
        label={transform ? transform(label) : label}
      />
    </FormGroup>
  );
};

Bool.defaultProps = {
  appearance: 'checkbox',
  fullWidth: true,
  margin: 'normal'
};

Bool.propTypes = {
  appearance: PropTypes.oneOf(['toggle', 'checkbox'])
};

export default connectField(Bool);
