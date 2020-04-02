import React, { HTMLProps, Ref } from 'react';
import classnames from 'classnames';
import { connectField, Override } from 'uniforms';
import omit from 'lodash/omit';

import wrapField from './wrapField';

export type LongTextFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    inputClassName?: string;
    error?: boolean;
    onChange: (value?: string) => void;
    inputRef?: Ref<HTMLTextAreaElement>;
    value?: string;
  }
>;

const LongText = (props: LongTextFieldProps) =>
  wrapField(
    omit(props, ['value', 'onChange']),
    <textarea
      className={classnames(props.inputClassName, 'form-control', {
        'is-invalid': props.error,
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

export default connectField<LongTextFieldProps>(LongText);
