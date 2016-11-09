import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

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
    ...props
}) => {
    const AntD = require('antd');
    const Input = AntD.Input;
    const Form = AntD.Form;
    const Col = AntD.Col;
    const FormItem = Form.Item;
    if(errorMessage && showInlineError){
        var vStatus = 'error';
    }else{
        var vStatus = null;
    }
    return(

    <FormItem
        label={label}
        help={showInlineError ? errorMessage : null}
        hasFeedback={true}
        validateStatus={vStatus}
        htmlFor={id}>
        <Input
            disabled={disabled}
            id={id}
            name={name}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            ref={inputRef}
            type={type}
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
