import connectField                  from 'uniforms/connectField';
import filterDOMProps                from 'uniforms/filterDOMProps';
import React                         from 'react';
import TextField                     from 'material-ui/TextField';
import {FormControl, FormHelperText} from 'material-ui/Form';

export const Date_ = ({onChange, ...props}) => (
    <FormControl disabled={props.disabled} error={!!props.error} required={props.required}>
        <TextField type="datetime-local" onChange={event => onChange(event.target.value)} {...filterDOMProps(props)} />
        {props.error && props.showInlineError && <FormHelperText>{props.errorMessage}</FormHelperText>}
    </FormControl>
);

export default connectField(Date_);
