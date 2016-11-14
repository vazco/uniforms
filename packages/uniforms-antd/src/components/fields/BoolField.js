import React            from 'react';
import {connectField}   from 'uniforms';

// SCHEMA PROTOTYPE
/*
boolfieldanttest:{
  type: Boolean,
  label: "Ant Boolean Field Sample",
  defaultValue: true
  }
  */

const Bool = ({
    disabled,
    errorMessage,
    id,
    inputRef,
    label,
    name,
    onChange,
    showInlineError,
    value
}) => {
    const AntD = require('antd');
    const Switch = AntD.Switch;
    const Form = AntD.Form;
    const Icon = AntD.Icon;
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
            <Switch
                id={id}
                name={name}
                ref={inputRef}
                checked={value}
                disabled={disabled}
                onChange={() => onChange(!value)}
                checkedChildren={<Icon type={'check'} />}
                unCheckedChildren={<Icon type={'cross'} />}
            />
        </FormItem>
    );
};

export default connectField(Bool);
