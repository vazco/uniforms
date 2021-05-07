import InputNumber, { InputNumberProps } from 'antd/lib/input-number';
import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type NumFieldProps = FieldProps<
  number,
  // FIXME: Why `onReset` fails with `wrapField`?
  Omit<InputNumberProps, 'onReset'>,
  { decimal?: boolean; inputRef?: Ref<typeof InputNumber> }
>;

function Num(props: NumFieldProps) {
  return wrapField(
    props,
    <InputNumber
      disabled={props.disabled}
      max={props.max}
      min={props.min}
      name={props.name}
      onChange={event => {
        const parse = props.decimal ? parseFloat : parseInt;
        const value = parse('' + event);
        props.onChange(isNaN(value) ? undefined : value);
      }}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={props.inputRef}
      step={props.step || (props.decimal ? 0.01 : 1)}
      style={{ width: '100%' }}
      value={props.value}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField<NumFieldProps>(Num, { kind: 'leaf' });
