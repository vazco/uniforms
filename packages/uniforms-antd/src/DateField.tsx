import DatePicker from 'antd/lib/date-picker';
import React, { Ref } from 'react';
import moment from 'moment';
import { connectField, filterDOMProps, Override } from 'uniforms';
import { DatePickerProps } from 'antd/lib/date-picker/interface';

import wrapField from './wrapField';

export type DateFieldProps = Override<
  DatePickerProps,
  {
    inputRef?: Ref<any>;
    onChange?: (value?: any) => void;
    id: string;
  }
>;

const Date = (props: DateFieldProps) =>
  wrapField(
    props,
    <DatePicker
      disabled={props.disabled}
      id={props.id}
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

Date.defaultProps = {
  showTime: true,
  style: { width: '100%' },
};

export default connectField(Date);
