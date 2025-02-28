import TextArea, { TextAreaProps, TextAreaRef } from 'antd/lib/input/TextArea';
import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type LongTextFieldProps = FieldProps<
  string,
  // FIXME: Why `onReset` fails with `wrapField`?
  Omit<TextAreaProps, 'onReset'>,
  { inputRef?: Ref<TextAreaRef> }
>;

function LongText({ rows = 5, ...props }: LongTextFieldProps) {
  return wrapField(
    props,
    <TextArea
      disabled={props.disabled}
      name={props.name}
      onChange={event => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={props.inputRef}
      rows={rows}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField<LongTextFieldProps>(LongText, { kind: 'leaf' });
