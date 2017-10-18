import connectField     from 'uniforms/connectField';
import filterDOMProps   from 'uniforms/filterDOMProps';
import React            from 'react';
import TextField        from 'material-ui/TextField';

import wrapField from './wrapField';

const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, onChange) => {
    const date = new Date(timestamp);
    if (date.getFullYear() < 10000) {
        onChange(date);
    }
};

export const Date_ = props => wrapField(props, (
    <TextField
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        error={!!props.error}
        FormHelperTextProps={props.FormHelperTextProps}
        fullWidth={props.fullWidth}
        helperText={props.error && props.showInlineError ? props.errorMessage : props.helperText}
        helperTextClassName={props.helperTextClassName}
        InputProps={props.InputProps}
        inputProps={{...props.inputProps, id: props.id}}
        inputRef={props.inputRef}
        label={props.label}
        margin={props.margin}
        onChange={event => dateParse(event.target.valueAsNumber, props.onChange)}
        placeholder={props.placeholder}
        type="datetime-local"
        value={dateFormat(props.value)}
        {...filterDOMProps(props)}
    />
));

Date_.defaultProps = {
    fullWidth: true
};

export default connectField(Date_);
