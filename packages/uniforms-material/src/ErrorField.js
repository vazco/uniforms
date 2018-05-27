import FormControl    from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing        from 'uniforms/nothing';

const Error = ({children, error, errorMessage, fullWidth, margin, ...props}) =>
    !error ? nothing : (
        <FormControl error={!!error} fullWidth={!!fullWidth} margin={margin}>
            <FormHelperText {...filterDOMProps(props)}>{children || errorMessage}</FormHelperText>
        </FormControl>
    )
;

Error.defaultProps = {
    fullWidth: true,
    margin: 'normal'
};

export default connectField(Error, {initialValue: false});
