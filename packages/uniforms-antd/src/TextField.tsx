import Input, { InputProps } from 'antd/lib/input';
import React, { Ref } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

import wrapField from './wrapField';

export type TextFieldProps = Override<
  InputProps,
  {
    inputRef?: Ref<Input>;
    onChange(value?: string): void;
    onReset?: () => void;
    value?: string;
  }
>;
function Text(props: TextFieldProps) {
  return wrapField(
    props,
    <Input
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      // @ts-ignore filterDOMProps will remove onChange
      onChange={event => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      type={props.type ?? 'text'}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField(Text, { kind: 'leaf' });
