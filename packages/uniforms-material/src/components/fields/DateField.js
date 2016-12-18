import DatePicker         from 'material-ui/DatePicker';
import React, {Component} from 'react';
import TextField          from './TextField';
import TimePicker         from 'material-ui/TimePicker';
import {connectField}     from 'uniforms';
import {ListItem}         from 'material-ui/List';

class Date_ extends Component {
    render () {
        const {
            props: {
                id,
                max,
                min,
                onChange,
                value,
                ...props
            }
        } = this;

        return (
            <ListItem
                disabled
                primaryText={<div>
                    <TextField
                        onChange={onChange}
                        onFocus={() => this.refs.datepicker.openDialog()}
                        value={value}
                        type="datetime"
                        {...props}
                    />
                    <DatePicker
                        value={value}
                        maxDate={max}
                        minDate={min}
                        onChange={(event, date) => {
                            if (value) {
                                date.setHours(value.getHours());
                                date.setMinutes(value.getMinutes());
                            }
                            onChange(date);
                            // TODO: Risky race?
                            this.refs.timepicker.openDialog();
                        }}
                        ref="datepicker"
                        id={`${id}-date`}
                        textFieldStyle={{display: 'none'}}
                    />
                    <TimePicker
                        value={value}
                        onChange={(event, date) => {
                            if (value) {
                                date.setFullYear(value.getFullYear());
                                date.setMonth(value.getMonth());
                                date.setDate(value.getDate());
                            }
                            onChange(date);
                        }}
                        ref="timepicker"
                        id={`${id}-time`}
                        textFieldStyle={{display: 'none'}}
                    />
                </div>}
            />
        );
    }
}

Date_.displayName = 'Date';

export default connectField(Date_, {ensureValue: false, includeInChain: false});
