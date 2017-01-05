import React            from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {ListItem}       from 'material-ui/List';
import ErrorOutline     from 'material-ui/svg-icons/alert/error-outline';
import {nothing}        from 'uniforms';

const Error = ({
    children,
    errorMessage,
    ...props
}) =>
    !errorMessage ? nothing : (
        <ListItem
            disabled
            leftIcon={<ErrorOutline />}
            primaryText={children || errorMessage}
            {...filterDOMProps(props)}
        />
    )
;

export default connectField(Error, {initialValue: false});
