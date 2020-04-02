import Input, { InputProps } from 'antd/lib/input';
import React, { Ref } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

import wrapField from './wrapField';

export type TextFieldProps = Override<
  InputProps,
  {
    onChange: (value?: string) => void;
    value?: string;
    inputRef?: Ref<Input>;
  }
>;
const Text = (props: TextFieldProps) =>
  wrapField(
    props,
    <Input
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      // @ts-ignore FIXME
      onChange={event => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      type={props.type ?? 'text'}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    />,
  );

export default connectField<TextFieldProps>(Text);
