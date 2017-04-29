import ErrorOutline   from 'material-ui/svg-icons/alert/error-outline';
import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing        from 'uniforms/nothing';
import {ListItem}     from 'material-ui/List';

const Error = ({children, error, errorMessage, ...props}) =>
    !error ? nothing : (
        <ListItem
            disabled
            leftIcon={<ErrorOutline />}
            primaryText={children || errorMessage}
            {...filterDOMProps(props)}
        />
    )
;

export default connectField(Error, {initialValue: false});
