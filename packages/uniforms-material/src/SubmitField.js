import BaseField      from 'uniforms/BaseField';
import Button         from '@material-ui/core/Button';
import filterDOMProps from 'uniforms/filterDOMProps';
import React          from 'react';

const SubmitField = ({children, disabled, inputRef, label, value, ...props}, {uniforms: {error, state}}) =>
    <Button
        disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
        ref={inputRef}
        type="submit"
        value={value}
        {...filterDOMProps(props)}
    >
        {label || children}
    </Button>
;

SubmitField.contextTypes = BaseField.contextTypes;

SubmitField.defaultProps = {label: 'Submit', variant: 'raised'};

export default SubmitField;
