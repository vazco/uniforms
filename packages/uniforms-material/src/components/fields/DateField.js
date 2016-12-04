import DatePicker       from 'material-ui/DatePicker';
import React            from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const Date_ = ({
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
    value,
    ...props
}) =>
    <DatePicker
        disabled={disabled}
        errorText={errorMessage}
        floatingLabelText={label}
        hintText={placeholder}
        id={id}
        maxDate={max}
        minDate={min}
        name={name}
        onChange={(event, date) => onChange(date)}
        ref={inputRef}
        value={value}
        {...filterDOMProps(props)}
    />
;

Date_.displayName = 'Date';

export default connectField(Date_, {ensureValue: false});
