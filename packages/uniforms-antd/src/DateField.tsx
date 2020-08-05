import DatePicker, { DatePickerProps } from 'antd/lib/date-picker';
import React, { Ref } from 'react';
import moment, { Moment } from 'moment';
import { connectField, FieldProps, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type DateFieldProps = FieldProps<
  Date | Moment,
  DatePickerProps,
  // FIXME: Seems like DatePickerProps doesn't contain 'showTime'.
  { inputRef?: Ref<typeof DatePicker>; showTime?: boolean }
>;

const defaultStyle = { width: '100%' };

function Date({
  showTime = true,
  style = defaultStyle,
  ...props
}: DateFieldProps) {
  return wrapField(
    { style, ...props },
    <DatePicker
      disabled={props.disabled}
      name={props.name}
      onChange={value => {
        props.onChange(value ? value.toDate() : undefined);
      }}
      placeholder={props.placeholder}
      // @ts-ignore: `DatePicker` is an intersection.
      ref={props.inputRef}
      showTime={showTime}
      value={props.value && moment(props.value)}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField(Date, { kind: 'leaf' });
