import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const Bool = ({
    className,
    disabled,
    error,
    errorMessage,
    id,
    inputRef,
    label,
    name,
    onChange,
    required,
    showInlineError,
    value,
    changed,
    ...props
}) => {
    const AntD = require('antd');
    const Switch = AntD.Switch;
    const Form = AntD.Form;
    const Icon = AntD.Icon;
    const FormItem = Form.Item;
    return(
            <FormItem
                label={label}
                help={showInlineError ? errorMessage : null}
                hasFeedback={true}
                validateStatus={errorMessage ? 'error' : null}
                htmlFor={id}>
                <Switch
                        id={id}
                        name={name}
                        ref={inputRef}
                        checked={value}
                        disabled={disabled}
                        onChange={() => onChange(!value)}
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren={<Icon type="cross" />}
                    />
            </FormItem>
)
}
;

export default connectField(Bool);
