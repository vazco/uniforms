import { DatePicker, DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { Ref } from 'react';
import { connectField, FieldProps, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type DateFieldProps = FieldProps<
  Date | Dayjs,
  DatePickerProps,
  // FIXME: Seems like DatePickerProps doesn't contain 'showTime'.
  { inputRef?: Ref<typeof DatePicker>; showTime?: boolean }
>;

const defaultStyle = { width: '100%' };

function Date({ style = defaultStyle, ...props }: DateFieldProps) {
  return wrapField(
    // @ts-ignore
    props,
    // @ts-ignore
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
      // @ts-ignore
      ref={props.inputRef}
      // @ts-ignore
      showTime={props.showTime ?? false}
      style={style}
      // @ts-ignore

      value={props.value ? dayjs(props.value) : undefined}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField<DateFieldProps>(Date, { kind: 'leaf' });
