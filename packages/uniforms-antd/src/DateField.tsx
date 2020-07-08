import DatePicker, { DatePickerProps } from 'antd/lib/date-picker';
import React, { Ref } from 'react';
import moment from 'moment';
import { connectField, filterDOMProps, Override } from 'uniforms';

import wrapField from './wrapField';

export type DateFieldProps = Override<
  DatePickerProps,
  {
    id: string;
    inputRef?: Ref<any>;
    onChange?(value?: any): void;
  }
>;

function Date(props: DateFieldProps) {
  return wrapField(
    props,
    <DatePicker
      disabled={props.disabled}
      name={props.name}
      onChange={value => {
        props.onChange && props.onChange(value && value.toDate());
      }}
      placeholder={props.placeholder}
      ref={props.inputRef}
      value={props.value && moment(props.value)}
      {...filterDOMProps(props)}
    />,
  );
}

Date.defaultProps = {
  showTime: true,
  style: { width: '100%' },
};

export default connectField(Date, { kind: 'leaf' });
