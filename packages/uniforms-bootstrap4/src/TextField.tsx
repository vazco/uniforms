import React, { HTMLProps, Ref } from 'react';
import classnames from 'classnames';
import { connectField, Override } from 'uniforms';
import omit from 'lodash/omit';

import wrapField from './wrapField';

export type TextFieldProps = Override<
  HTMLProps<HTMLInputElement>,
  {
    inputClassName?: string;
    error?: boolean;
    inputRef?: Ref<HTMLInputElement>;
    onChange: (value?: string) => void;
    value?: string;
  }
>;

const Text = (props: TextFieldProps) =>
  wrapField(
    omit(props, ['value', 'onChange']),
    <input
      className={classnames(props.inputClassName, 'form-control', {
        'is-invalid': props.error,
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
