import FormControl    from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel     from '@material-ui/core/InputLabel';
import Input          from '@material-ui/core/Input';
import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, onChange) => {
    const date = new DateConstructor(timestamp);
    if (date.getFullYear() < 10000) {
        onChange(date);
    } else if (isNaN(timestamp)) {
        onChange(undefined);
    }
};

const Date = ({
    disabled,
    error,
    errorMessage,
    fullWidth,
    helperText,
    inputRef,
    label,
    margin,
    name,
    onChange,
    placeholder,
    required,
    showInlineError,
    value,
    labelProps,
    ...props
}) => (
    <FormControl
        disabled={!!disabled}
        error={!!error}
        fullWidth={!!fullWidth}
        margin={margin}
        required={required}
    >
        {label && <InputLabel htmlFor={name} {...labelProps}>{label}</InputLabel>}
        <Input
            name={name}
            onChange={event => dateParse(event.target.valueAsNumber, onChange)}
            placeholder={placeholder}
            ref={inputRef}
            type="datetime-local"
            value={dateFormat(value)}
            {...filterDOMProps(props)}
        />
        {showInlineError && error ? (
            <FormHelperText>{errorMessage}</FormHelperText>
        ) : (
            helperText && <FormHelperText>{helperText}</FormHelperText>
        )}
    </FormControl>
);

Date.defaultProps = {
    fullWidth: true,
    margin: 'normal'
};

export default connectField(Date);
