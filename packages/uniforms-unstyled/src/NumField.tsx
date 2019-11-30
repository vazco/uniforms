import React, { Component } from 'react';
import { connectField, filterDOMProps } from 'uniforms';

const Num = ({
  decimal,
  disabled,
  id,
  inputRef,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  step,
  value,
  ...props
}) => (
  <div {...filterDOMProps(props)}>
    {label && <label htmlFor={id}>{label}</label>}

    <input
      disabled={disabled}
      id={id}
      max={max}
      min={min}
      name={name}
      onChange={event => {
        const parse = decimal ? parseFloat : parseInt;
        const value = parse(event.target.value);
        onChange(isNaN(value) ? undefined : value);
      }}
      placeholder={placeholder}
      ref={inputRef}
      step={step || (decimal ? 0.01 : 1)}
      type="number"
      value={value}
    />
  </div>
);

export default connectField(Num);
