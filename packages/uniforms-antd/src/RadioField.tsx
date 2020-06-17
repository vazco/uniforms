import RadioAntD, { RadioProps } from 'antd/lib/radio';
import React from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

import wrapField from './wrapField';

export type RadioFieldProps = Override<
  RadioProps,
  {
    allowedValues?: string[];
    onChange(value?: string): void;
    transform?(value: string): string;
    value?: string;
  }
>;

function Radio(props: RadioFieldProps) {
  return wrapField(
    props,
    <RadioAntD.Group
      disabled={props.disabled}
      name={props.name}
      // @ts-ignore filterDOMProps will remove onChange
      onChange={event => props.onChange(event.target.value)}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    >
      {props.allowedValues?.map(value => (
        <RadioAntD
          key={value}
          value={value}
          style={{
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          }}
        >
          {props.transform ? props.transform(value) : value}
        </RadioAntD>
      ))}
    </RadioAntD.Group>,
  );
}

export default connectField(Radio);
