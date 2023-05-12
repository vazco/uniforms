import omit from 'lodash/omit';
import React from 'react';
import { HTMLFieldProps, connectField, filterDOMProps } from 'uniforms';

import type { Option } from './types';

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
    checkboxes?: boolean;
  }
>;

function Radio({
  options,
  disabled,
  id,
  label,
  name,
  onChange,
  readOnly,
  value,
  ...props
}: RadioFieldProps) {
  return (
    <div {...omit(filterDOMProps(props), ['checkboxes'])}>
      {label && <label>{label}</label>}

      {options?.map(option => (
        <div key={option.key ?? option.value}>
          <input
            checked={option.value === value}
            disabled={option.disabled || disabled}
            id={`${id}-${option.key ?? escape(option.value)}`}
            name={name}
            onChange={() => {
              if (!readOnly) {
                onChange(option.value);
              }
            }}
            type="radio"
          />

          <label htmlFor={`${id}-${option.key ?? escape(option.value)}`}>
            {option.label ?? option.value}
          </label>
        </div>
      ))}
    </div>
  );
}

export default connectField<RadioFieldProps>(Radio, { kind: 'leaf' });
