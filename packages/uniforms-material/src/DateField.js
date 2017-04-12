import DatePicker     from 'material-ui/DatePicker';
import React          from 'react';
import TextField      from 'material-ui/TextField';
import TimePicker     from 'material-ui/TimePicker';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import {Component}    from 'react';

class Date_ extends Component {
    static displayName = 'Date';

    static defaultProps = {fullWidth: true};

    constructor () {
        super(...arguments);

        this._intermediate = null;

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onFocus      = this.onFocus.bind(this);
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
            DateTimeFormat,
            autoOk,
            cancelLabel,
            disableYearSelection,
            disabled,
            error,
            errorMessage,
            firstDayOfWeek,
            formatDate,
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
                    errorText={error && showInlineError ? errorMessage : undefined}
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
                    DateTimeFormat={DateTimeFormat}
                    autoOk={autoOk}
                    cancelLabel={cancelLabel}
                    disableYearSelection={disableYearSelection}
                    firstDayOfWeek={firstDayOfWeek}
                    formatDate={formatDate}
                    id={`${id}-date`}
                    locale={locale}
                    maxDate={max}
                    minDate={min}
                    okLabel={okLabel}
                    onChange={this.onChangeDate}
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
