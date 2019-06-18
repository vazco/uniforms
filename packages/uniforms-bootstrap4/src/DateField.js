import React from 'react';
import classnames from 'classnames';
import connectField from 'uniforms/connectField';

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

const Date = props =>
  wrapField(
    props,
    <input
      className={classnames(props.inputClassName, 'form-control', {
        'is-invalid': props.error
      })}
      disabled={props.disabled}
      id={props.id}
      max={dateFormat(props.max)}
      min={dateFormat(props.min)}
      name={props.name}
      onChange={event => dateParse(event.target.valueAsNumber, props.onChange)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      type="datetime-local"
      value={dateFormat(props.value)}
    />
  );
export default connectField(Date);
