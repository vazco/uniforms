import connectField     from 'uniforms/connectField';
import filterDOMProps   from 'uniforms/filterDOMProps';
import nothing          from 'uniforms/nothing';
import React            from 'react';
import {FormControl}    from 'material-ui/Form';
import {FormHelperText} from 'material-ui/Form';

const Error = ({children, error, errorMessage, ...props}) =>
    !error ? nothing : (
        <FormControl error={!!error}>
            <FormHelperText {...filterDOMProps(props)}>{children || errorMessage}</FormHelperText>
        </FormControl>
    )
;

export default connectField(Error, {initialValue: false});
