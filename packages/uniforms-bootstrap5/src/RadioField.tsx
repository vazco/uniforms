import classnames from 'classnames';
import React from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

import type { Option } from './types';
import wrapField from './wrapField';

const base64: (string: string) => string =
  typeof btoa === 'undefined'
    ? /* istanbul ignore next */ x => Buffer.from(x).toString('base64')
    : btoa;
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

export type RadioFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  {
    options?: Option<string>[];
    inline?: boolean;
    inputClassName?: string;
  }
>;

function Radio(props: RadioFieldProps) {
  return wrapField(
    props,
    props.options?.map(item => (
      <div
        key={item.key ?? item.value}
        className={classnames(props.inputClassName, 'form-check', {
          'text-danger': props.error,
          'text-success': !props.error && props.changed,
          'form-check-inline': props.inline,
        })}
      >
        <label
          htmlFor={`${props.id}-${item.key ?? escape(item.value)}`}
          className="form-check-label"
        >
          <input
            checked={item.value === props.value}
            className="form-check-input"
            disabled={props.disabled}
            id={`${props.id}-${item.key ?? escape(item.value)}`}
            name={props.name}
            onChange={() => {
              if (!props.readOnly) {
                props.onChange(item.value);
              }
            }}
            type="radio"
          />{' '}
          {item.label ?? item.value}
        </label>
      </div>
    )),
  );
}

export default connectField<RadioFieldProps>(Radio, { kind: 'leaf' });
