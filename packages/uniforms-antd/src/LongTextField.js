import connectField     from 'uniforms/connectField';
import React            from 'react';

import FormGroup from './FormGroup';

const LongText = ({
    disabled,
    errorMessage,
    id,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    showInlineError,
    value,
    info,
    rows
}) => {
    const AntD = require('antd');
    const Input = AntD.Input;
    return (
        <FormGroup errorMessage={errorMessage} id={id} label={label} showInlineError={showInlineError} info={info} >
            <Input
                disabled={disabled}
                id={id}
                name={name}
                onChange={event => onChange(event.target.value)}
                placeholder={placeholder}
                ref={inputRef}
                type={'textarea'}
                rows={rows ? rows : 5}
                value={value}
            />
        </FormGroup>
    );
}
;

LongText.defaultProps = {
    type: 'text'
};

export default connectField(LongText);

// SCHEMA PROTOTYPE
/*
state: {
    type: String
},
zip: {
    type: String,
    regEx: /^[0-9]{5}$/
},
field: {
    type: String,
    uniforms: {rows: 14, type: 'textarea' }
}
*/
