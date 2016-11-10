import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

/* EXAMPLEs
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
    className,
    disabled,
    error,
    errorMessage,
    icon,
    iconLeft,
    iconProps,
    id,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    required,
    showInlineError,
    type,
    value,
    rows,
    changed,
    ...props
}) => {
    const AntD = require('antd');
    const Input = AntD.Input;
    const Form = AntD.Form;
    const Col = AntD.Col;
    const FormItem = Form.Item;
    return(
    <FormItem
        label={label}
        help={showInlineError ? errorMessage : null}
        hasFeedback={true}
        validateStatus={errorMessage ? 'error' : null}
        htmlFor={id}>
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

    )
}
;

Text.defaultProps = {
    type: 'text'
};

export default connectField(Text);
