import RaisedButton     from 'material-ui/RaisedButton';
import React            from 'react';
import {BaseField}      from 'uniforms';
import {filterDOMProps} from 'uniforms';

const SubmitField = ({inputRef, label, value, ...props}, {uniforms: {error, state: {disabled}}}) =>
    <RaisedButton
        disabled={!!(error || disabled)}
        label={label}
        ref={inputRef}
        type="submit"
        value={value}
        {...filterDOMProps(props)}
    />
;

SubmitField.contextTypes = BaseField.contextTypes;
SubmitField.defaultProps = {
    label: 'Submit'
};

export default SubmitField;
