import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

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
    className,
    disabled,
    error,
    errorMessage,
    id,
    label,
    name,
    onChange,
    required,
    showInlineError,
    transform,
    value,
    options,
    ...props
}) => {
const AntD = require('antd');
const Radio = AntD.Radio;
const RadioGroup = Radio.Group;
const Form = AntD.Form;
const FormItem = Form.Item;
var op = options ? options : allowedValues;
return(
<FormItem
    label={label}
    help={showInlineError ? errorMessage : null}
    hasFeedback={true}
    validateStatus={errorMessage ? 'error' : null}
    htmlFor={id}
    style={{marginBottom: "12px"}}
    >

    <RadioGroup onChange={(e)=> onChange(e.target.value)} value={value}>
        {op.map((val) => {
            if(val instanceof Object){
                return(
                    <Radio key={val.value} value={val.value} style={{display: 'block', height: '30px', lineHeight: '30px' }}>
                        {val.label}
                    </Radio>
            )}else{
                return(
                    <Radio key={val} value={val} style={{display: 'block', height: '30px', lineHeight: '30px' }}>
                        {transform ? transform(val) : val}
                    </Radio>
            )}})}
    </RadioGroup>

</FormItem>
)}


export default connectField(Radio);
