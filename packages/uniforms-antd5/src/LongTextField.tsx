import {Input,  InputProps, InputRef } from 'antd';
import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

const { TextArea } = Input;


export type LongTextFieldProps = FieldProps<
  string,
  // FIXME: Why `onReset` fails with `wrapField`?
  Omit<InputRef, 'onReset'>,
  { inputRef?: Ref<InputRef> }
>;

// @ts-ignore
function LongText({ rows = 5, ...props }: LongTextFieldProps) {
  return wrapField(
    props,
    <TextArea
      disabled={props.disabled}
      name={props.name}
      onChange={(event: { target: { value: string | undefined; }; }) =>
        props.onChange(
          event.target.value === '' ? undefined : event.target.value,
        )
      }
      // @ts-ignore

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
