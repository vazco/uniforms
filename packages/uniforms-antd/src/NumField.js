import connectField   from 'uniforms/connectField';
import React          from 'react';

import FormGroup from './FormGroup';

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
    info,
    step,
}) => {
    const AntD = require('antd');
    const InputNumber = AntD.InputNumber;
    return (
        <FormGroup errorMessage={errorMessage} id={id} label={label} showInlineError={showInlineError} info={info} >
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
        </FormGroup>
    );
};

export default connectField(Num);

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
