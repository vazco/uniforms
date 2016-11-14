import React            from 'react';
import {connectField}   from 'uniforms';

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
}) => {
    const AntD = require('antd');
    const Input = AntD.Input;
    const Form = AntD.Form;
    const FormItem = Form.Item;
    return (
        <FormItem
            label={label}
            help={showInlineError ? errorMessage : null}
            hasFeedback
            validateStatus={errorMessage ? 'error' : null}
            htmlFor={id}
            style={{marginBottom: '12px'}}
        >
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
        </FormItem>
    );
}
;

Text.defaultProps = {
    type: 'text'
};

export default connectField(Text);
