import DatePicker, { DatePickerProps } from 'antd/lib/date-picker';
import moment, { Moment } from 'moment';
import React, { Ref } from 'react';
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
    props,
    <DatePicker
      disabled={props.disabled}
      inputReadOnly={props.readOnly}
      name={props.name}
      onChange={value => {
        if (!props.readOnly) {
          props.onChange(value ? value.toDate() : undefined);
        }
      }}
      placeholder={props.placeholder}
      // @ts-expect-error: `DatePicker` is an intersection.
      ref={props.inputRef}
      showTime={showTime}
      style={style}
      value={props.value && moment(props.value)}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField<DateFieldProps>(Date, { kind: 'leaf' });
