import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React from 'react';
import {Fragment} from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

import wrapField from './wrapField';

const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, onChange) => {
  const date = new DateConstructor(timestamp);
  if (date.getFullYear() < 10000) {
    onChange(date);
  } else if (isNaN(timestamp)) {
    onChange(undefined);
  }
};

const Date = ({inputRef, label, labelProps, name, onChange, placeholder, value, ...props}) =>
  wrapField(
    props,
    <Fragment>
      {label && (
        <InputLabel htmlFor={name} {...labelProps}>
          {label}
        </InputLabel>
      )}
      <Input
        name={name}
        onChange={event => dateParse(event.target.valueAsNumber, onChange)}
        placeholder={placeholder}
        ref={inputRef}
        type="datetime-local"
        value={dateFormat(value)}
        {...filterDOMProps(props)}
      />
    </Fragment>
  );

Date.defaultProps = {
  fullWidth: true,
  margin: 'normal'
};

export default connectField(Date);
