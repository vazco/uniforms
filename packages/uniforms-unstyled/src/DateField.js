import React from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

function convertDateToLocalString(dateInUtc) {
  //Convert to local timezone
  return new DateConstructor(dateInUtc.getTime() - dateInUtc.getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .slice(0, -8);
}

const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = value => value && convertDateToLocalString(value);
const dateParse = (timestamp, onChange) => {
  const date = new DateConstructor(timestamp + new DateConstructor().getTimezoneOffset() * 60 * 1000);
  if (date.getFullYear() < 10000) {
    onChange(date);
  } else if (isNaN(timestamp)) {
    onChange(undefined);
  }
};

const Date = ({disabled, id, inputRef, label, max, min, name, onChange, placeholder, value, ...props}) => (
  <div {...filterDOMProps(props)}>
    {label && <label htmlFor={id}>{label}</label>}

    <input
      disabled={disabled}
      id={id}
      max={dateFormat(max)}
      min={dateFormat(min)}
      name={name}
      onChange={event => dateParse(event.target.valueAsNumber, onChange)}
      placeholder={placeholder}
      ref={inputRef}
      type="datetime-local"
      value={dateFormat(value)}
    />
  </div>
);
export default connectField(Date);
