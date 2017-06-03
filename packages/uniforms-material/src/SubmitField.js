import BaseField      from 'uniforms/BaseField';
import RaisedButton   from 'material-ui/RaisedButton';
import React          from 'react';
import filterDOMProps from 'uniforms/filterDOMProps';

const SubmitField = ({disabled, inputRef, label, value, ...props}, {uniforms: {error, state}}) =>
    <RaisedButton
        disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
        label={label}
        ref={inputRef}
        type="submit"
        value={value}
        {...filterDOMProps(props)}
    />
;

SubmitField.contextTypes = BaseField.contextTypes;
SubmitField.defaultProps = {label: 'Submit'};

export default SubmitField;
