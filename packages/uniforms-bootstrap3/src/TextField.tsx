import React, { Ref } from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';
import { connectField, HTMLFieldProps } from 'uniforms';

import wrapField from './wrapField';

export type TextFieldProps = HTMLFieldProps<
  string,
  HTMLInputElement,
  {
    inputClassName?: string;
    inputRef?: Ref<HTMLInputElement>;
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

export default connectField(Text, { kind: 'leaf' });
