import React            from 'react';
import {BaseField}      from 'uniforms';
import {filterDOMProps} from 'uniforms';

const SubmitField = ({inputRef, value, ...props}, {uniforms: {error, state: {disabled}}}) =>
    <input
        disabled={!!(error || disabled)}
        ref={inputRef}
        type="submit"
        value={value}
        {...filterDOMProps(props)}
    />
;

SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
