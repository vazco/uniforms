import React            from 'react';
import classnames       from 'classnames';
import {BaseField}      from 'uniforms';
import {filterDOMProps} from 'uniforms';

const SubmitField = ({className, inputRef, value, ...props}, {uniforms: {error, state: {disabled}}}) => {
    const AntD = require('antd');
    const Button = AntD.Button;
    return(
    <Button
        disabled={!!(error || disabled)}
        ref={inputRef}
        type="primary"
        htmlType="submit"
        {...filterDOMProps(props)}
    >
    {value ? value : 'Submit'}
    </Button>
)}
;

SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
