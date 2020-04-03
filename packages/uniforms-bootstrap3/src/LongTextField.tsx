import classnames from 'classnames';
import omit from 'lodash/omit';
import React, { HTMLProps, Ref } from 'react';
import { connectField, Override } from 'uniforms';

import wrapField from './wrapField';

export type LongTextFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    error?: boolean;
    inputClassName?: string;
    inputRef?: Ref<HTMLTextAreaElement>;
    onChange: (value?: string) => void;
    value?: string;
  }
>;

const LongText = (props: LongTextFieldProps) =>
  wrapField(
    omit(props, ['value', 'onChange']),
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
