import React       from 'react';
import {BaseField} from 'uniforms';

const SubmitField = ({inputRef, ...props}, {uniforms: {error, state: {disabled}}}) =>
    <input {...props} ref={inputRef} type="submit" disabled={!!(error || disabled)} />
;

SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
