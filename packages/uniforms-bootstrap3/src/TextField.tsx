import classnames from 'classnames';
import omit from 'lodash/omit';
import React, { HTMLProps, Ref } from 'react';
import { connectField, Override } from 'uniforms';

import wrapField from './wrapField';

export type TextFieldProps = Override<
  HTMLProps<HTMLInputElement>,
  {
    error?: boolean;
    inputClassName?: string;
    inputRef?: Ref<HTMLInputElement>;
    onChange(value?: string): void;
    value?: string;
  }
>;

function Text(props: TextFieldProps) {
  return wrapField(
    { feedbackable: true, ...omit(props, ['onChange']) },
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
}

export default connectField<TextFieldProps>(Text);
