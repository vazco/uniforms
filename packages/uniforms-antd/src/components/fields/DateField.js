import React            from 'react';
import {connectField}   from 'uniforms';
import moment from 'moment';
import FormGroup from '../forms/FormGroup.js';



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
    let dateMoment = moment(timestamp);
    const date = dateMoment.toDate();
    if (!showTime) {
        dateMoment = moment(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
    }
    onChange(dateMoment.toDate());
    return;
};

class Date_ extends (React.Component) {
    constructor () {
        super(...arguments);
        this.state = {
        };
    }

    componentWillMount () {
        if (!(this.props.value instanceof Date) && this.props.value) {
            const dateMoment = moment(this.props.value,this.props.format);
            this.props.onChange(dateMoment.toDate());
        }
    }

    render () {
        const {
            props:{
                disabled,
                errorMessage,
                id,
                inputRef,
                label,
                max,
                min,
                name,
                onChange,
                placeholder,
                showInlineError,
                value,
                format,
                allowClear,
                showTime,
                info
              }
            } = this;
        const AntD = require('antd');
        const DatePicker = AntD.DatePicker;
        const enUS = require('antd/lib/date-picker/locale/en_US');
        const LocaleProvider = AntD.LocaleProvider;
        return (
            <FormGroup errorMessage={errorMessage} id={id} label={label} showInlineError={showInlineError} info={info} >
                <LocaleProvider locale={enUS}>
                    <DatePicker
                        ref={inputRef}
                        disabled={disabled}
                        id={id}
                        max={moment(max,format)}
                        min={moment(min,format)}
                        name={name}
                        showTime={showTime}
                        format={format ? format : 'DD-MM-YYYY'}
                        placeholder={placeholder}
                        onChange={value => dateParse(value, dateFormat, onChange, showTime)}
                        allowClear={allowClear}
                        value={value instanceof Date ? moment(value.toISOString()) : moment(new Date().toISOString())}
                    />
                </LocaleProvider>
            </FormGroup>
        );
    }
}

Date_.displayName = 'Date';

export default connectField(Date_);
