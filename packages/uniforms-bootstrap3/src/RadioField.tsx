import classnames from 'classnames';
import React from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

import wrapField from './wrapField';

const base64 =
  typeof btoa !== 'undefined'
    ? btoa
    : (x: string) => Buffer.from(x).toString('base64');
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

export type RadioFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  {
    allowedValues?: string[];
    inline?: boolean;
    inputClassName?: string;
    transform?(value: string): string;
  }
>;

function Radio(props: RadioFieldProps) {
  return wrapField(
    props,
    props.allowedValues?.map(item => (
      <div
        key={item}
        className={classnames(
          props.inputClassName,
          `radio${props.inline ? '-inline' : ''}`,
        )}
      >
        <label htmlFor={`${props.id}-${escape(item)}`}>
          <input
            checked={item === props.value}
            disabled={props.disabled}
            id={`${props.id}-${escape(item)}`}
            name={props.name}
            onChange={() => (props.readOnly ? undefined : props.onChange(item))}
            type="radio"
          />
          {props.transform ? props.transform(item) : item}
        </label>
      </div>
    )),
  );
}

export default connectField(Radio, { kind: 'leaf' });
