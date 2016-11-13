import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';
import moment from 'moment';



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

class Date_ extends (React.Component) {
    constructor(){
    super(...arguments);
    this.state = {
    }
}
componentWillMount(){
  if(!(this.props.value instanceof Date) && this.props.value ){
    var dateMoment = moment(this.props.value,this.props.format);
    this.props.onChange(dateMoment.toDate())
  }
}
render(){

const {
  props: { className,
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
  },
  props
} = this;
    const AntD = require('antd');
    const DatePicker = AntD.DatePicker;
    const FormItem = AntD.Form.Item;
    const enUS = require('antd/lib/date-picker/locale/en_US');
    const LocaleProvider = AntD.LocaleProvider;
    return(
        <FormItem
            label={label}
            help={showInlineError ? errorMessage : null}
            hasFeedback={true}
            validateStatus={errorMessage ? 'error' : null}
            htmlFor={id}
            style={{marginBottom: "12px"}}
            >
            <LocaleProvider locale={enUS}>
            <DatePicker
             ref={inputRef}
             disabled={disabled}
             id={id}
             max={moment(max,format)}
             min={moment(min,format)}
             name={name}
             showTime={showTime}
             format={format ? format : "DD-MM-YYYY"}

             placeholder={placeholder}
             onChange={(value, datestring) => dateParse(value, dateFormat, onChange, showTime)}
             allowClear={allowClear}
             value={value instanceof Date? moment(value.toISOString()) : moment( new Date().toISOString()) }
         /></LocaleProvider>
    </FormItem>
)}
}

Date_.displayName = 'Date';

export default connectField(Date_);
