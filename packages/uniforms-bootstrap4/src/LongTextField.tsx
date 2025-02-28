import classnames from 'classnames';
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
      className={classnames(props.inputClassName, 'form-control', {
        'is-invalid': props.error,
        'is-valid': !props.error && props.changed,
      })}
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      onChange={event => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={props.inputRef}
      rows={props.rows}
      value={props.value ?? ''}
    />,
  );
}

export default connectField<LongTextFieldProps>(LongText, { kind: 'leaf' });
