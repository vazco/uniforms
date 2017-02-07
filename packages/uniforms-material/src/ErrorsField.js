import BaseField      from 'uniforms/BaseField';
import ErrorOutline   from 'material-ui/svg-icons/alert/error-outline';
import React          from 'react';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing        from 'uniforms/nothing';
import {ListItem}     from 'material-ui/List';
import {List}         from 'material-ui/List';

const ErrorsField = ({children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? nothing : (
        <List {...filterDOMProps(props)}>
            {!!children && (
                <ListItem primaryText={children} disabled />
            )}
            {schema.getErrorMessages(error).map((message, index) =>
                <ListItem key={index} disabled primaryText={message} leftIcon={<ErrorOutline />} />
            )}
        </List>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
