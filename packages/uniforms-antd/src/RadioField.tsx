import RadioAntD, { RadioProps } from 'antd/lib/radio';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

const base64: (string: string) => string =
  typeof btoa === 'undefined'
    ? /* istanbul ignore next */ x => Buffer.from(x).toString('base64')
    : btoa;
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

export type RadioFieldProps = FieldProps<
  string,
  RadioProps,
  { allowedValues?: string[]; transform?: (value: string) => string }
>;

const radioStyle = { display: 'block' };

function Radio(props: RadioFieldProps) {
  return wrapField(
    props,
    <RadioAntD.Group
      disabled={props.disabled}
      name={props.name}
      onChange={event => {
        if (!props.readOnly) {
          props.onChange(event.target.value);
        }
      }}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    >
      {props.allowedValues?.map(value => (
        <RadioAntD
          id={`${props.id}-${escape(value)}`}
          key={value}
          style={radioStyle}
          value={value}
        >
          {props.transform ? props.transform(value) : value}
        </RadioAntD>
      ))}
    </RadioAntD.Group>,
  );
}

export default connectField<RadioFieldProps>(Radio, { kind: 'leaf' });
