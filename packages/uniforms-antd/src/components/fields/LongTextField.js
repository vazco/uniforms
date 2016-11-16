import React            from 'react';
import {connectField}   from 'uniforms';
import FormGroup from '../forms/FormGroup.js';

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
    type,
    value,
    info,
    rows,
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
                type={type}
                rows={rows}
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
