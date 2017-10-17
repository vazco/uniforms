import connectField     from 'uniforms/connectField';
import filterDOMProps   from 'uniforms/filterDOMProps';
import React            from 'react';
import TextField        from 'material-ui/TextField';
import {FormControl}    from 'material-ui/Form';
import {FormHelperText} from 'material-ui/Form';

const LongText = ({disabled, label, onChange, placeholder, value, ...props}) => (
    <FormControl disabled={disabled} error={!!props.error} required={props.required}>
        <TextField
            disabled={disabled}
            label={label}
            multiline
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            value={value}
            {...filterDOMProps(props)}
        />
        {props.error && props.showInlineError && <FormHelperText>{props.errorMessage}</FormHelperText>}
    </FormControl>
);

export default connectField(LongText);
