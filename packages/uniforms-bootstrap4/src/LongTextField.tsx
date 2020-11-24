import classnames from 'classnames';
import omit from 'lodash/omit';
import React, { Ref } from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

import wrapField from './wrapField';

export type LongTextFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputClassName?: string; inputRef?: Ref<HTMLTextAreaElement> }
>;

function LongText(props: LongTextFieldProps) {
  return wrapField(
    props,
    <textarea
      autoComplete={props.autoComplete}
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
}

export default connectField(LongText, { kind: 'leaf' });
