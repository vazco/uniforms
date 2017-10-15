import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import React from 'react';
import TextField from 'material-ui/TextField';

export const Date_ = props => (
    <TextField type="datetime-local" {...filterDOMProps(props)} />
);

export default connectField(Date_);
