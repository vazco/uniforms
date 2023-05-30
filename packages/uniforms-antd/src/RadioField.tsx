import RadioAntD, { RadioProps } from 'antd/lib/radio';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import type { Option } from './types';
import wrapField from './wrapField';

const base64: (string: string) => string =
  typeof btoa === 'undefined'
    ? /* istanbul ignore next */ x => Buffer.from(x).toString('base64')
    : btoa;
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

export type RadioFieldProps = FieldProps<
  string,
  RadioProps,
  { options?: Option<string>[] }
>;

const radioStyle = { display: 'block' };

function Radio(props: RadioFieldProps) {
  return wrapField(
    props,
    <RadioAntD.Group
      {...filterDOMProps(props)}
      disabled={props.disabled}
      name={props.name}
      onChange={event => {
        if (!props.readOnly) {
          props.onChange(event.target.value);
        }
      }}
      value={props.value ?? ''}
      options={props.options?.map(option => ({
        ...option,
        label: option.label ?? option.value,
      }))}
    >
      {props.options?.map(option => (
        <RadioAntD
          id={`${props.id}-${escape(option.value)}`}
          key={option.key ?? option.value}
          style={radioStyle}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label ?? option.value}
        </RadioAntD>
      ))}
    </RadioAntD.Group>,
  );
}

export default connectField<RadioFieldProps>(Radio, { kind: 'leaf' });
