import RadioAntD, { RadioProps } from 'antd/lib/radio';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import type { Option } from './types';
import wrapField from './wrapField';

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
      {props.options?.map(option => (
        <RadioAntD
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
