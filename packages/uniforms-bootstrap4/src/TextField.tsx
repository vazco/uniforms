import classnames from 'classnames';
import omit from 'lodash/omit';
import React, { Ref } from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

import wrapField from './wrapField';

export type TextFieldProps = HTMLFieldProps<
  string,
  HTMLInputElement,
  { inputClassName?: string; inputRef?: Ref<HTMLInputElement> }
>;

function Text(props: TextFieldProps) {
  return wrapField(
    omit(props, ['autoComplete']),
    <input
      autoComplete={props.autoComplete}
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
      type={props.type ?? 'text'}
      value={props.value ?? ''}
    />,
  );
}

export default connectField<TextFieldProps>(Text, { kind: 'leaf' });
