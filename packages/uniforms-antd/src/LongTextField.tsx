import Input, { InputProps, TextAreaProps } from 'antd/lib/input';
import React, { Ref } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

import wrapField from './wrapField';

// NOTE: Input.TextArea was introduced in 2.12.0 and removed in 3.0.0.
// istanbul ignore next
const [TextArea, textAreaProps] = Input.TextArea
  ? [Input.TextArea, {}]
  : [Input, { type: 'textarea' }];

export type LongTextFieldProps = Override<
  (InputProps & { rows?: never }) | TextAreaProps,
  {
    inputRef: Ref<Input>;
    onChange(value?: any): void;
    prefix?: string;
    value?: string;
  }
>;

function LongText(props: LongTextFieldProps) {
  return wrapField(
    props,
    // @ts-ignore
    <TextArea
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      onChange={event => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      value={props.value ?? ''}
      {...textAreaProps}
      {...filterDOMProps(props)}
    />,
  );
}

LongText.defaultProps = { rows: 5 };

export default connectField(LongText);
