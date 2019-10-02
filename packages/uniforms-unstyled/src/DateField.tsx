import React from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const DateConstructor = globalThis.Date;
const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, onChange) => {
  const date = new DateConstructor(timestamp);
  if (date.getFullYear() < 10000) {
    onChange(date);
  } else if (isNaN(timestamp)) {
    onChange(undefined);
  }
};

const Date = ({
  disabled,
  id,
  inputRef,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  value,
  ...props
}) => (
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
