import BaseField      from 'uniforms/BaseField';
import FormControl    from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React          from 'react';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing        from 'uniforms/nothing';

const ErrorsField = ({children, fullWidth, margin, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? nothing : (
        <FormControl error={!!error} fullWidth={!!fullWidth} margin={margin}>
            {!!children && (
                <FormHelperText {...filterDOMProps(props)}>{children}</FormHelperText>
            )}
            {schema.getErrorMessages(error).map((message, index) =>
                <FormHelperText key={index} {...filterDOMProps(props)}>{message}</FormHelperText>
            )}
        </FormControl>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

ErrorsField.defaultProps = {
    fullWidth: true,
    margin: 'normal'
};

export default ErrorsField;
