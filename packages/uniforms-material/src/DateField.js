import connectField                from 'uniforms/connectField';
import DatePicker                  from 'material-ui/DatePicker';
import filterDOMProps              from 'uniforms/filterDOMProps';
import React                       from 'react';
import TextField                   from 'material-ui/TextField';
import TimePicker                  from 'material-ui/TimePicker';
import {Component}                 from 'react';

class Date_ extends Component {
    static displayName = 'Date';

    static defaultProps = {fullWidth: true};

    constructor () {
        super(...arguments);

        this._intermediate = null;

        this.onFocus      = this.onFocus.bind(this);
        this.onDismiss    = this.onDismiss.bind(this);
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

    onDismiss (...args) {
        this.props.onDismiss(...args);
    }

    render () {
        const {
            autoOk,
            cancelLabel,
            DateTimeFormat,
            disabled,
            disableYearSelection,
            errorMessage,
            firstDayOfWeek,
            id,
            inputRef,
            label,
            locale,
            max,
            min,
            name,
            okLabel,
            pedantic,
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
                    value={value ? value.toLocaleString() : ''}
                    {...filterDOMProps(props)}
                />

                <DatePicker
                    autoOk={autoOk}
                    cancelLabel={cancelLabel}
                    DateTimeFormat={DateTimeFormat}
                    disableYearSelection={disableYearSelection}
                    firstDayOfWeek={firstDayOfWeek}
                    id={`${id}-date`}
                    locale={locale}
                    maxDate={max}
                    minDate={min}
                    okLabel={okLabel}
                    onChange={this.onChangeDate}
                    onDismiss={(...args) => this.onDismiss(true, false, ...args)}
                    ref="datepicker"
                    textFieldStyle={{display: 'none'}}
                    value={value}
                />

                <TimePicker
                    autoOk={autoOk}
                    cancelLabel={cancelLabel}
                    format={timeFormat}
                    id={`${id}-time`}
                    okLabel={okLabel}
                    onChange={this.onChangeTime}
                    onDismiss={(...args) => this.onDismiss(false, true, ...args)}
                    pedantic={pedantic}
                    ref="timepicker"
                    textFieldStyle={{display: 'none'}}
                    value={value}
                />
            </div>
        );
    }
}

export default connectField(Date_, {ensureValue: false, includeInChain: false});
