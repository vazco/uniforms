import DatePicker     from 'material-ui/DatePicker';
import React          from 'react';
import TextField      from 'material-ui/TextField';
import TimePicker     from 'material-ui/TimePicker';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import {Component}    from 'react';

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
            disabled,
            errorMessage,
            id,
            inputRef,
            label,
            max,
            min,
            name,
            placeholder,
            showInlineError,
            timeFormat,
            value,
            ...props
        } = this.props;

        return (
            <div>
                <TextField
                    disabled={disabled}
                    errorText={showInlineError ? errorMessage : undefined}
                    floatingLabelText={label}
                    hintText={placeholder}
                    id={id}
                    name={name}
                    onFocus={this.onFocus}
                    ref={inputRef}
                    value={value && value.toLocaleString()}
                    {...filterDOMProps(props)}
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
