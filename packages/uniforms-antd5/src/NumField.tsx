import {InputNumber, InputNumberProps } from 'antd';
import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type NumFieldProps = FieldProps<
  number,
  // FIXME: Why `onReset` fails with `wrapField`?
  Omit<InputNumberProps, 'onReset'>,
  // FIXME: `unknown` ref; see https://github.com/vazco/uniforms/discussions/1230#discussioncomment-5158439
  { decimal?: boolean; inputRef?: Ref<unknown> }
>;

function Num(props: NumFieldProps) {
  return wrapField(
    props,
    <InputNumber
      disabled={props.disabled}
      max={props.max}
      min={props.min}
      name={props.name}
      onChange={value => {
        // Direct value from InputNumber, no need for event.target.value
        const parse = props.decimal ? parseFloat : parseInt;
        const parsedValue = parse('' + value);
        props.onChange(isNaN(parsedValue) ? undefined : parsedValue);
      }}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      // @ts-ignore
      ref={props.inputRef}
      step={props.step || (props.decimal ? 0.01 : 1)}
      style={{ width: '100%' }}
      type="number"
      value={props.value}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField<NumFieldProps>(Num, { kind: 'leaf' });
