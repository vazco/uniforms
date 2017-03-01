import BaseField from 'uniforms/BaseField';
import Button    from 'antd/lib/button';
import React     from 'react';

const SubmitField = ({className, inputRef, value, ...props}, {uniforms: {error, state: {disabled}}}) =>
    <Button
        disabled={!!(error || disabled)}
        htmlType="submit"
        ref={inputRef}
        type="primary"
    >
        {value}
    </Button>
;

SubmitField.contextTypes = BaseField.contextTypes;

SubmitField.defaultProps = {
    value: 'Submit'
};

export default SubmitField;
