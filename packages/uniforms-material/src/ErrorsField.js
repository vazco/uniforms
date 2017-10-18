import BaseField        from 'uniforms/BaseField';
import filterDOMProps   from 'uniforms/filterDOMProps';
import nothing          from 'uniforms/nothing';
import React            from 'react';
import {FormControl}    from 'material-ui/Form';
import {FormHelperText} from 'material-ui/Form';

const ErrorsField = ({children, fullWidth, margin, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? nothing : (
        <FormControl error={!!error} fullWidth={fullWidth} margin={margin} {...filterDOMProps(props)}>
            {!!children && (
                <FormHelperText>{children}</FormHelperText>
            )}
            {schema.getErrorMessages(error).map(message =>
                <FormHelperText key={message}>{message}</FormHelperText>
            )}
        </FormControl>
    )
;

ErrorsField.propTypes = {
    fullWidth: true
};

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
