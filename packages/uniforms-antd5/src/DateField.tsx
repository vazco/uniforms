import { DatePicker, DatePickerProps } from 'antd';
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
    // @ts-ignore
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
      // @ts-ignore

      value={props.value ? moment(props.value) : undefined}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField<DateFieldProps>(Date, { kind: 'leaf' });
