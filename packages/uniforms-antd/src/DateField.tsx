import DatePicker, { DatePickerProps } from 'antd/lib/date-picker';
import React, { Ref } from 'react';
import moment, { Moment } from 'moment';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type DateFieldProps = FieldProps<
  Date | Moment,
  DatePickerProps,
  { inputRef?: Ref<typeof DatePicker> }
>;

function Date(props: DateFieldProps) {
  return wrapField(
    props,
    <DatePicker
      disabled={props.disabled}
      name={props.name}
      onChange={value => {
        props.onChange(value ? value.toDate() : undefined);
      }}
      placeholder={props.placeholder}
      // @ts-ignore: `DatePicker` is an intersection.
      ref={props.inputRef}
      value={props.value && moment(props.value)}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField(Date, { kind: 'leaf' });
