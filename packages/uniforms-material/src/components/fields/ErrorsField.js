import ErrorOutline     from 'material-ui/svg-icons/alert/error-outline';
import React            from 'react';
import {BaseField}      from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {List, ListItem} from 'material-ui/List';
import {nothing}        from 'uniforms';

const ErrorsField = ({children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? nothing : (
        <List {...filterDOMProps(props)}>
            {!! children && (
                <ListItem primaryText={children} disabled />
            )}
            {/* TODO: Make leftIcon optional */}
            {schema.getErrorMessages(error).map((message, index) =>
                <ListItem key={index} disabled primaryText={message} leftIcon={<ErrorOutline />} />
            )}
        </List>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
