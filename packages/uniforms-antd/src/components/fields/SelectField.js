import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

// SCHEMA PROTOTYPE
/*
"select": {
    type: String,
    allowedValues: ['111','2222','333','444'],
},
"selectOptional": {
    type: String,
    allowedValues: ['qqq','www','rrr','eee'],
    optional: true
},
"multiselectAllowed": {
    type: [String],
    allowedValues: ['ggg','hhh','jjj','kkk'],
    uniforms: {
                multiple: true
            },
    minCount: 1,
    custom: function(){ return(this.value.length === 0 ? "minCount" :  this.value[0] == null ? "minCount" : null )}
},
"multiselect": {
    type: [String],
    minCount: 1,
    custom: function(){ return(this.value.length === 0 ? "minCount" :  this.value[0] == null ? "minCount" : null )},
    uniforms: {
                multiple: true,
                options: [{value: 'aaa', label: 'a'},{value: 'bbb', label: 'b'},{value: 'ccc', label: 'c'},{value: 'ddd', label: 'd'}]
                }
},
"checkboxes": {
       type: String,
       allowedValues: ['111','2222','333','444'],
       uniforms: {
           checkboxes: true,
           multiple: true
       }
  */

const xor = (item, array) => {
    const index = array.indexOf(item);
    if (index === -1) {
        return array.concat([item]);
    }

    return array.slice(0, index).concat(array.slice(index + 1));
};

const renderCheckboxesAD = ({
    allowedValues,
    disabled,
    fieldType,
    id,
    name,
    onChange,
    transform,
    value,
    multiple,
    options,
    ...props
}) => {
    const AntD = require('antd');
    const Checkbox = AntD.Checkbox;
    const CheckboxGroup = Checkbox.Group;
    const Radio = AntD.Radio;
    const RadioGroup = Radio.Group;
    var op = options ? options : allowedValues;
    return(
        <CheckboxGroup options={op} onChange={onChange} value={value}/>
        )
}



const renderSelectAD = ({allowedValues, disabled, required, id, name, onChange, transform, value, inputRef, placeholder,multiple, label,options, ...props}) =>{
    const AntD = require('antd');
    const Select = AntD.Select;
    const Option = Select.Option;
    if(options){
        var op = options
        if(!required && !multiple){
            op.unshift({value: '...', label: '...'})
        }
    }else{
        var op = allowedValues
        if(!required && !multiple){
            op.unshift('...')
        }
    }
    return(
    <Select
        disabled={disabled}
        multiple={multiple}
        allowClear={multiple}
        id={id}
        name={name}
        onChange={(value) => onChange(value)}
        ref={inputRef}
    >
        {op.map((val) => {
            if(val instanceof Object){
            return(
                <Option key={val.value} value={val.value}>
                    {val.label}
                </Option>
            )}else{
            return(
                <Option key={val} value={val}>
                    {transform ? transform(val) : val}
                </Option>
            )}})}
    </Select>
)}


const Select = ({
    allowedValues,
    checkboxes,
    className,
    disabled,
    error,
    errorMessage,
    fieldType,
    id,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    required,
    showInlineError,
    transform,
    value,
    multiple,
    options,
    ...props
}) =>{
    const AntD = require('antd');
    const Form = AntD.Form;
    const FormItem = Form.Item;
return(
    <FormItem
        label={label}
        help={showInlineError ? errorMessage : null}
        hasFeedback={true}
        validateStatus={errorMessage ? 'error' : null}
        htmlFor={id}>
        {checkboxes
            ? renderCheckboxesAD({allowedValues, disabled, id, name, onChange, transform, value, fieldType, multiple, options, ...props})
            : renderSelectAD    ({allowedValues, disabled, required, id, name, onChange, transform, value, inputRef, placeholder, multiple, label, options, ...props})}
    </FormItem>
)}


export default connectField(Select);
