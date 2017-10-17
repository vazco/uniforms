import connectField     from 'uniforms/connectField';
import filterDOMProps   from 'uniforms/filterDOMProps';
import React            from 'react';
import TextField        from 'material-ui/TextField';
import {FormControl}    from 'material-ui/Form';
import {FormHelperText} from 'material-ui/Form';

const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, onChange) => {
    const date = new Date(timestamp);
    if (date.getFullYear() < 10000) {
        onChange(date);
    }
};

export const Date_ = ({disabled, label, onChange, placeholder, value, ...props}) => (
    <FormControl disabled={disabled} error={!!props.error} required={props.required}>
        <TextField
            disabled={disabled}
            label={label}
            onChange={event => dateParse(event.target.valueAsNumber, onChange)}
            placeholder={placeholder}
            type="datetime-local"
            value={dateFormat(value)}
            {...filterDOMProps(props)}
        />
        {props.error && props.showInlineError && <FormHelperText>{props.errorMessage}</FormHelperText>}
    </FormControl>
);

export default connectField(Date_);
