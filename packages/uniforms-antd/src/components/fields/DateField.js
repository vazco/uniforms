import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';
import moment from 'moment';
import enUS from 'antd/lib/date-picker/locale/en_US';


// SCHEMA PROTOTYPE
/*
datesamplefield: {
  type: Date,
  label: "This is a date component",
  defaultValue: "12-12-2015 16:45:45" / new Date(2015,10,2,3,4,5)
  uniforms: {
    showTime: true,
    format: "DD-MM-YYYY HH:mm:ss",
    placeholder: "Select Date",
    disabled: false,
    allowClear: false
  }
}
*/

const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, datestring, onChange, showTime) => {
  var dateMoment = moment(timestamp);
  var date = dateMoment.toDate();
    if(!showTime){
      var dateMoment = moment(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
    }
    onChange(dateMoment.toDate());
    return;
};

const Date_ = ({
    className,
    disabled,
    error,
    errorMessage,
    icon,
    iconLeft,
    iconProps,
    id,
    inputRef,
    label,
    max,
    min,
    name,
    onChange,
    placeholder,
    required,
    showInlineError,
    value,
    format,
    allowClear,
    showTime,
    ...props
}) =>
    {
    const AntD = require('antd');
    const DatePicker = AntD.DatePicker;
    const FormItem = AntD.Form.Item;
    //not sure how to make this robust and not change state..
    if(!(value instanceof Date) && value ){
      var dateMoment = moment(value,format);
      onChange(dateMoment.toDate())
    }
    return(
        <FormItem
            label={label}
            help={showInlineError ? errorMessage : null}
            hasFeedback={true}
            validateStatus={errorMessage ? 'error' : null}
            htmlFor={id}>
            <DatePicker
             ref={inputRef}
             disabled={disabled}
             id={id}
             max={moment(max,format)}
             min={moment(min,format)}
             name={name}
             showTime={showTime}
             format={format ? format : "DD-MM-YYYY"}
             locale={enUS}
             placeholder={placeholder}
             onChange={(value, datestring) => dateParse(value, dateFormat, onChange, showTime)}
             allowClear={allowClear}
             value={value instanceof Date? moment(value.toISOString()) : moment( new Date().toISOString()) }
         />
    </FormItem>
)};

Date_.displayName = 'Date';

export default connectField(Date_);
