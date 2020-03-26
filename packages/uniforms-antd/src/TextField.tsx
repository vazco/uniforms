import Input, { InputProps } from 'antd/lib/input';
import React, { Ref } from 'react';
import { connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

type TextFieldProps = {
  onChange: (value?: string) => void;
  value?: string;
  inputRef?: Ref<Input>;
} & InputProps;
const Text = (props: TextFieldProps) =>
  wrapField(
    props,
    <Input
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      onChange={event => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      type={props.type ?? 'text'}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    />,
  );

export default connectField<TextFieldProps>(Text);
