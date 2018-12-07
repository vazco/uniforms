import InputNumber from 'antd/lib/input-number';
import React from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

import wrapField from './wrapField';

const noneIfNaN = x => (isNaN(x) ? undefined : x);

const Num = props =>
  wrapField(
    props,
    <InputNumber
      disabled={props.disabled}
      id={props.id}
      max={props.max}
      min={props.min}
      name={props.name}
      onChange={value => props.onChange(noneIfNaN(value))}
      placeholder={props.placeholder}
      ref={props.inputRef}
      step={props.step || (props.decimal ? 0.01 : 1)}
      value={props.value}
      style={{width: '100%'}}
      {...filterDOMProps(props)}
    />
  );
export default connectField(Num, {ensureValue: false});
