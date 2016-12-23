import React            from 'react';
import {connectField}   from 'uniforms';
import FormGroup from './FormGroup';

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

const Text = ({
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
    rows,
    info
}) => {
    const AntD = require('antd');
    const Input = AntD.Input;
    return (
        <FormGroup errorMessage={errorMessage} id={id} label={label} showInlineError={showInlineError} info={info}>
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

Text.defaultProps = {
    type: 'text'
};

export default connectField(Text);
