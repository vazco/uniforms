import Input, { InputProps } from 'antd/lib/input';
import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type TextFieldProps = FieldProps<
  string,
  Omit<InputProps, 'onReset'>,
  { inputRef?: Ref<Input> }
>;

function Text(props: TextFieldProps) {
  return wrapField(
    props,
    <Input
      disabled={props.disabled}
      name={props.name}
      onChange={event => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={props.inputRef}
      type={props.type ?? 'text'}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField<TextFieldProps>(Text, { kind: 'leaf' });
