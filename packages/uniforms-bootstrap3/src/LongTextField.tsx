import React, { HTMLProps, Ref } from 'react';
import classnames from 'classnames';
import { connectField } from 'uniforms';

import wrapField from './wrapField';

export type LongTextFieldProps = {
  inputClassName?: string;
  error?: boolean;
  onChange: (value?: string) => void;
  inputRef?: Ref<HTMLTextAreaElement>;
  value?: string;
} & HTMLProps<HTMLDivElement>;

const LongText = (props: LongTextFieldProps) =>
  wrapField(
    props,
    <textarea
      className={classnames(props.inputClassName, 'form-control', {
        'form-control-danger': props.error,
      })}
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      onChange={event => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      rows={props.rows}
      value={props.value ?? ''}
    />,
  );

export default connectField(LongText);
