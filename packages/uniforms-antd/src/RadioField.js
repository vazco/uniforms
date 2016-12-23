import React            from 'react';
import {connectField}   from 'uniforms';
import FormGroup from './FormGroup';

// SCHEMA PROTOTYPE
/*
"radio": {
    type: String,
    allowedValues: ['111','2222','333','444'],
    uniforms: {
        checkboxes: true
    }
},
*/


const Radio = ({
    allowedValues,
    disabled,
    errorMessage,
    id,
    label,
    name,
    onChange,
    showInlineError,
    transform,
    info,
    value,
    options
}) => {
    const AntD = require('antd');
    const Radio = AntD.Radio;
    const RadioGroup = Radio.Group;
    const op = options ? options : allowedValues;
    return (
        <FormGroup errorMessage={errorMessage} id={id} label={label} showInlineError={showInlineError} info={info} >
            <RadioGroup onChange={e => onChange(e.target.value)} value={value} disabled={disabled} name={name}>
                {op.map(val => {
                    let rad = '';
                    if (val instanceof Object) {
                        rad = (
                            <Radio
                                key={val.value}
                                value={val.value}
                                style={{
                                    display: 'block',
                                    height: '30px',
                                    lineHeight: '30px'
                                }}
                            >
                                {val.label}
                            </Radio>
                        );
                    } else {
                        rad = (
                            <Radio
                                key={val}
                                value={val}
                                style={{
                                    display: 'block',
                                    height: '30px',
                                    lineHeight: '30px'
                                }}
                            >
                                {transform ? transform(val) : val}
                            </Radio>
                        );
                    }
                    return rad;
                })}
            </RadioGroup>
        </FormGroup>
    );
};


export default connectField(Radio);
