import DatePicker   from 'material-ui/DatePicker';
import React        from 'react';
import TextField    from './TextField';
import TimePicker   from 'material-ui/TimePicker';
import connectField from 'uniforms/connectField';
import {Component}  from 'react';

const noop = () => {};
const dateFormat = date => date && date.toLocaleString();

class Date_ extends Component {
    static displayName = 'Date';

    static defaultProps = {
        fullWidth: true
    };

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
        setTimeout(() => this.refs.datepicker.openDialog(), 100);
    }

    render () {
        const {
            props: {
                id,
                max,
                min,
                timeFormat,
                value,
                ...props
            }
        } = this;

        return (
            <div>
                <TextField
                    id={id}
                    onFocus={this.onFocus}
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
        );
    }
}

export default connectField(Date_, {ensureValue: false, includeInChain: false});
