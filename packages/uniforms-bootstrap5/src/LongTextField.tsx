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
    omit(props, ['autoComplete', 'minLength', 'maxLength']),
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
      minLength={props.minLength}
      maxLength={props.maxLength}
      readOnly={props.readOnly}
      ref={props.inputRef}
      rows={props.rows}
      value={props.value ?? ''}
    />,
  );
}

export default connectField<LongTextFieldProps>(LongText, { kind: 'leaf' });
