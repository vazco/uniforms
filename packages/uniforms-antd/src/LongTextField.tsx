import React, { Ref } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { TextAreaProps } from 'antd/lib/input';
import { connectField, filterDOMProps, Override } from 'uniforms';

import wrapField from './wrapField';

export type LongTextFieldProps = Override<
  Omit<TextAreaProps, 'onReset'>,
  {
    inputRef?: Ref<TextArea>;
    onChange(value?: any): void;
    prefix?: string;
    value?: string;
  }
>;

function LongText(props: LongTextFieldProps) {
  return wrapField(
    props,
    <TextArea
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      onChange={event => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    />,
  );
}

LongText.defaultProps = { rows: 5 };

export default connectField(LongText, { kind: 'leaf' });
