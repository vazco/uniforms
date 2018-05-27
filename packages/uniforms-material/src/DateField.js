import FormControl    from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel      from '@material-ui/core/FormLabel';
import Input          from '@material-ui/core/Input';
import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, onChange) => {
    const date = new Date(timestamp);
    if (date.getFullYear() < 10000) {
        onChange(date);
    } else if (isNaN(timestamp)) {
        onChange(undefined);
    }
};

const Date_ = ({
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
    ...props
}) => (
    <FormControl
        disabled={!!disabled}
        error={!!error}
        fullWidth={!!fullWidth}
        margin={margin}
        required={required}
    >
        {label && <FormLabel component="legend" htmlFor={name}>{label}</FormLabel>}
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

Date_.defaultProps = {
    fullWidth: true,
    margin: 'normal'
};

export default connectField(Date_, {ensureValue: false});
