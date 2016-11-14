import React            from 'react';
import {connectField}   from 'uniforms';

// SCHEMA PROTOTYPE
/*
number: {
    type: Number,
    label: "Number Test"
},
numberDec: {
    type: Number,
    label: "Number Test Deci",
    decimal: true,
    uniforms: {step: 0.1}  // number < 1 for deci
},
  */

const noneIfNaN = x => isNaN(x) ? undefined : x;

const Num = ({
    disabled,
    decimal,
    errorMessage,
    id,
    inputRef,
    label,
    max,
    min,
    name,
    onChange,
    placeholder,
    showInlineError,
    value,
    step,
}) => {
    const AntD = require('antd');
    const InputNumber = AntD.InputNumber;
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
            <InputNumber
                disabled={disabled}
                id={id}
                max={max}
                min={min}
                name={name}
                step={step ? step : 1}
                onChange={value => onChange(noneIfNaN((decimal ? parseFloat : parseInt)(value)))}
                placeholder={placeholder}
                ref={inputRef}
                value={value}
            />
        </FormItem>
    );
};


export default connectField(Num);
