import DatePicker         from 'material-ui/DatePicker';
import React, {Component} from 'react';
import TextField          from './TextField';
import TimePicker         from 'material-ui/TimePicker';
import {connectField}     from 'uniforms';
import {ListItem}         from 'material-ui/List';

const dateFormat = value => value && value.toISOString().slice(0, -8);

class Date_ extends Component {
    render () {
        const {
            props: {
                id,
                max,
                min,
                onChange,
                value,
                timeFormat,
                ...props
            }
        } = this;

        return (
            <ListItem
                disabled
                primaryText={(
                    <div>
                        <TextField
                            onChange={() => {}}
                            onFocus={() => this.refs.datepicker.openDialog()}
                            value={dateFormat(value)}
                            type="datetime-local"
                            {...props}
                        />
                        <DatePicker
                            maxDate={max}
                            minDate={min}
                            value={value}
                            onChange={(event, date) => {
                                if (value) {
                                    date.setHours(value.getHours());
                                    date.setMinutes(value.getMinutes());
                                }
                                onChange(date);
                                this.refs.timepicker.openDialog();
                            }}
                            ref="datepicker"
                            id={`${id}-date`}
                            textFieldStyle={{display: 'none'}}
                        />
                        <TimePicker
                            format={timeFormat}
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
                    </div>
                )}
            />
        );
    }
}

Date_.displayName = 'Date';

export default connectField(Date_, {ensureValue: false, includeInChain: false});
