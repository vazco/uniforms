import connectField                  from 'uniforms/connectField';
import filterDOMProps                from 'uniforms/filterDOMProps';
import React                         from 'react';
import TextField                     from 'material-ui/TextField';
import {FormControl, FormHelperText} from 'material-ui/Form';

const Text = ({disabled, label, onChange, placeholder, value, ...props}) => (
    <FormControl disabled={disabled} error={!!props.error} required={props.required}>
        <TextField
            disabled={disabled}
            label={label}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            value={value}
            {...filterDOMProps(props)}
        />
        {props.error && props.showInlineError && <FormHelperText>{props.errorMessage}</FormHelperText>}
    </FormControl>
);

export default connectField(Text);
