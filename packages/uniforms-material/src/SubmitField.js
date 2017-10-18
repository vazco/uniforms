import BaseField      from 'uniforms/BaseField';
import Button         from 'material-ui/Button';
import filterDOMProps from 'uniforms/filterDOMProps';
import React          from 'react';

const SubmitField = ({disabled, inputRef, label, value, ...props}, {uniforms: {error, state}}) =>
    <Button
        color="primary"
        disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
        raised
        ref={inputRef}
        type="submit"
        value={value}
        {...filterDOMProps(props)}
    >
        {label}
    </Button>
;

SubmitField.contextTypes = BaseField.contextTypes;
SubmitField.defaultProps = {label: 'Submit'};

export default SubmitField;
