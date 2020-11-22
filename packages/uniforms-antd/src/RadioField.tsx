import RadioAntD, { RadioProps } from 'antd/lib/radio';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type RadioFieldProps = FieldProps<
  string,
  RadioProps,
  { allowedValues?: string[]; transform?(value: string): string }
>;

const radioStyle = { display: 'block' };

function Radio(props: RadioFieldProps) {
  return wrapField(
    props,
    <RadioAntD.Group
      disabled={props.disabled}
      name={props.name}
      onChange={event => props.onChange(event.target.value)}
      value={props.value ?? ''}
      {...wrapField.__filterProps(filterDOMProps(props))}
    >
      {props.allowedValues?.map(value => (
        <RadioAntD key={value} style={radioStyle} value={value}>
          {props.transform ? props.transform(value) : value}
        </RadioAntD>
      ))}
    </RadioAntD.Group>,
  );
}

export default connectField(Radio, { kind: 'leaf' });
