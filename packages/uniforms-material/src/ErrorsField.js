import BaseField        from 'uniforms/BaseField';
import filterDOMProps   from 'uniforms/filterDOMProps';
import nothing          from 'uniforms/nothing';
import React            from 'react';
import {FormControl}    from 'material-ui/Form';
import {FormHelperText} from 'material-ui/Form';

import wrapField from './wrapField';

const ErrorsField = (props, {uniforms: {error, schema}}) =>
    (!error && !props.children) ? nothing : wrapField(props, (
        <FormControl error={!!error} fullWidth={props.fullWidth} margin={props.margin} {...filterDOMProps(props)}>
            {!!props.children && (
                <FormHelperText>{props.children}</FormHelperText>
            )}
            {schema.getErrorMessages(error).map((message, index) =>
                <FormHelperText key={index}>{message}</FormHelperText>
            )}
        </FormControl>
    ))
;

ErrorsField.defaultProps = {
    fullWidth: true,
    margin: 'normal'
};

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
