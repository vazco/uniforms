import React, { HTMLProps, Ref } from 'react';
import classnames from 'classnames';
import { connectField } from 'uniforms';

import wrapField from './wrapField';

type TextFieldProps = {
  inputClassName?: string;
  error?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  onChange: (value?: string) => void;
  value?: string;
} & HTMLProps<HTMLInputElement>;

const Text = (props: TextFieldProps) =>
  wrapField(
    { feedbackable: true, ...props },
    <input
      className={classnames(props.inputClassName, 'form-control', {
        'form-control-danger': props.error,
      })}
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      onChange={event => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      type={props.type ?? 'text'}
      value={props.value ?? ''}
    />,
  );

export default connectField<TextFieldProps>(Text);
