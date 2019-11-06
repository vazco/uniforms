import React from 'react';
import classnames from 'classnames';
import { connectField } from 'uniforms';

import wrapField from './wrapField';

const DateConstructor = globalThis.Date;
const dateFormat = (value: any) => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp: any, onChange: any) => {
  const date = new DateConstructor(timestamp);
  if (date.getFullYear() < 10000) {
    onChange(date);
  } else if (isNaN(timestamp)) {
    onChange(undefined);
  }
};

const Date = (props: any) =>
  wrapField(
    props,
    <input
      className={classnames(props.inputClassName, 'form-control', {
        'form-control-danger': props.error
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
