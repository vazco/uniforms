import BaseField      from 'uniforms/BaseField';
import React          from 'react';
import filterDOMProps from 'uniforms/filterDOMProps';

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
