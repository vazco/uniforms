import React       from 'react';
import {BaseField} from 'uniforms';

const SubmitField = (props, {uniforms: {error, state: {disabled}}}) =>
    <input {...props} type="submit" disabled={!!(error || disabled)} />
;

SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
