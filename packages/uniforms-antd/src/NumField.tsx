import InputNumber, { InputNumberProps } from 'antd/lib/input-number';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

const noneIfNaN = x => (isNaN(x) ? undefined : x);

export type NumFieldProps = {
  decimal?: boolean;
  inputRef: (instance: InputNumber | null) => void;
  onChange: (value?: number) => void;
} & InputNumberProps;

const Num = (props: NumFieldProps) =>
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
      style={{ width: '100%' }}
      {...filterDOMProps(props)}
    />,
  );

export default connectField<NumFieldProps>(Num);
