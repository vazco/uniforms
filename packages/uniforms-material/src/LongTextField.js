import connectField                  from 'uniforms/connectField';
import filterDOMProps                from 'uniforms/filterDOMProps';
import React                         from 'react';
import TextField                     from 'material-ui/TextField';
import {FormControl, FormHelperText} from 'material-ui/Form';

const LongText = ({onChange, ...props}) => (
    <FormControl disabled={props.disabled} error={!!props.error} required={props.required}>
        <TextField multiline onChange={event => onChange(event.target.value)} {...filterDOMProps(props)} />
        {props.error && props.showInlineError && <FormHelperText>{props.errorMessage}</FormHelperText>}
    </FormControl>
);

export default connectField(LongText);
