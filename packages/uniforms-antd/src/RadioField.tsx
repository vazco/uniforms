import RadioAntD, { RadioProps } from 'antd/lib/radio';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
import { GroupProps } from 'antd/lib/input';

import wrapField from './wrapField';

type RadioFieldProps = {
  transform?: (string?: string) => string;
  allowedValues: string[];
  onChange: (string) => void;
  value?: string;
} & GroupProps &
  RadioProps;

const Radio = (props: RadioFieldProps) =>
  wrapField(
    props,
    <RadioAntD.Group
      disabled={props.disabled}
      name={props.name}
      onChange={event => props.onChange(event.target.value)}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    >
      {props.allowedValues.map(value => (
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

export default connectField(Radio);
