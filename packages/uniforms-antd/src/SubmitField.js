import BaseField      from 'uniforms/BaseField';
import React          from 'react';

const SubmitField = ({className, inputRef, value, ...props}, {uniforms: {error, state: {disabled}}}) => {
    const AntD = require('antd');
    const Button = AntD.Button;
    return (
        <Button
            disabled={!!(error || disabled)}
            ref={inputRef}
            type="primary"
            htmlType="submit"
        >
            {value ? value : 'Submit'}
        </Button>
    );
}
;

SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
