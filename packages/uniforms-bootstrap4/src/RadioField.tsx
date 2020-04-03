import classnames from 'classnames';
import React, { HTMLProps } from 'react';
import { connectField, Override } from 'uniforms';

import wrapField from './wrapField';

const base64 =
  typeof btoa !== 'undefined'
    ? btoa
    : (x: string) => Buffer.from(x).toString('base64');
const escape = (x: string) => base64(x).replace(/=+$/, '');

export type RadioFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    allowedValues: string[];
    error?: boolean;
    inline?: boolean;
    inputClassName?: string;
    onChange: (string) => void;
    transform?: (string?: string) => string;
  }
>;

const Radio = (props: RadioFieldProps) =>
  wrapField(
    props,
    props.allowedValues.map(item => (
      <div
        key={item}
        className={classnames(props.inputClassName, 'form-check', 'radio', {
          'text-danger': props.error,
          'custom-control-inline': props.inline,
        })}
      >
        <label
          htmlFor={`${props.id}-${escape(item)}`}
          className="form-check-label"
        >
          <input
            checked={item === props.value}
            className="form-check-input"
            disabled={props.disabled}
            id={`${props.id}-${escape(item)}`}
            name={props.name}
            onChange={() => props.onChange(item)}
            type="radio"
          />{' '}
          {props.transform ? props.transform(item) : item}
        </label>
      </div>
    )),
  );

export default connectField<RadioFieldProps>(Radio);
