import connectField     from 'uniforms/connectField';
import filterDOMProps   from 'uniforms/filterDOMProps';
import nothing          from 'uniforms/nothing';
import React            from 'react';
import {FormControl}    from 'material-ui/Form';
import {FormHelperText} from 'material-ui/Form';

import wrapField from './wrapField';

const Error = props =>
    !props.error ? nothing : wrapField(props, (
        <FormControl error={!!props.error}>
            <FormHelperText {...filterDOMProps(props)}>{props.children || props.errorMessage}</FormHelperText>
        </FormControl>
    ))
;

export default connectField(Error, {initialValue: false});
