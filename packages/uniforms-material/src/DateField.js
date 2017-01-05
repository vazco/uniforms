import DatePicker   from 'material-ui/DatePicker';
import React        from 'react';
import TextField    from './TextField';
import TimePicker   from 'material-ui/TimePicker';
import connectField from 'uniforms/connectField';
import {Component}  from 'react';
import {ListItem}   from 'material-ui/List';

const noop = () => {};
const dateFormat = date => date && date.toLocaleString();

class Date_ extends Component {
    static displayName = 'Date';

    constructor () {
        super(...arguments);

        this._intermediate = null;

        this.onFocus      = this.onFocus.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
    }

    onChangeDate (event, date) {
        this._intermediate = date;
        this.refs.timepicker.openDialog();
    }

    onChangeTime (event, date) {
        this._intermediate.setHours(date.getHours());
        this._intermediate.setMinutes(date.getMinutes());
        this._intermediate.setSeconds(date.getSeconds());
        this._intermediate.setMilliseconds(date.getMilliseconds());

        this.props.onChange(this._intermediate);

        this._intermediate = null;
    }

    onFocus () {
        this.refs.datepicker.openDialog();
    }

    render () {
        const {
            props: {
                id,
                max,
                min,
                style,
                timeFormat,
                value,
                ...props
            }
        } = this;

        return (
            <ListItem
                disabled
                primaryText={(
                    <div>
                        <TextField
                            id={id}
                            onFocus={this.onFocus}
                            style={{marginTop: -14, ...style}}
                            value={dateFormat(value)}
                            {...props}
                            onChange={noop}
                        />

                        <DatePicker
                            id={`${id}-date`}
                            maxDate={max}
                            minDate={min}
                            onChange={this.onChangeDate}
                            ref="datepicker"
                            textFieldStyle={{display: 'none'}}
                            value={value}
                        />

                        <TimePicker
                            format={timeFormat}
                            id={`${id}-time`}
                            onChange={this.onChangeTime}
                            ref="timepicker"
                            textFieldStyle={{display: 'none'}}
                            value={value}
                        />
                    </div>
                )}
            />
        );
    }
}

export default connectField(Date_, {ensureValue: false, includeInChain: false});
