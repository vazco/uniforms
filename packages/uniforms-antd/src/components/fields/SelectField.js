import React            from 'react';
import {connectField}   from 'uniforms';

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
    minCount: 1,
    custom: function(){ return(this.value.length === 0 ? "minCount" :  this.value[0] == null ? "minCount" : null )}
},
"multiselect": {
    type: [String],
    minCount: 1,
    custom: function(){ return(this.value.length === 0 ? "minCount" :  this.value[0] == null ? "minCount" : null )},
    uniforms: {
                options: [
                    {
                        value: 'aaa',
                        label: 'a'
                    },
                    {
                        value: 'bbb',
                        label: 'b'
                    },
                    {
                        value: 'ccc',
                        label: 'c'
                    },
                    {
                        value: 'ddd',
                        label: 'd'
                    }]
                }
},
"checkboxes": {
       type: [String],
       allowedValues: ['111','2222','333','444'],
       uniforms: {
           checkboxes: true
       }
  */
/*
const xor = (item, array) => {
    const index = array.indexOf(item);
    if (index === -1) {
        return array.concat([item]);
    }

    return array.slice(0, index).concat(array.slice(index + 1));
};
*/

const renderCheckboxesAD = ({
    allowedValues,
    disabled,
    id,
    name,
    onChange,
    options,
    defaultValue,
}) => {
    const AntD = require('antd');
    const Checkbox = AntD.Checkbox;
    const CheckboxGroup = Checkbox.Group;
    const op = options ? options : allowedValues;
    return (
        <CheckboxGroup
            options={op}
            id={id}
            name={name}
            onChange={onChange}
            defaultValue={defaultValue}
            disabled={disabled}
        />
    );
};



const renderSelectAD = ({
    allowedValues,
    disabled,
    required,
    id,
    name,
    onChange,
    transform,
    inputRef,
    options,
    fieldType,
    defaultValue
}) => {
    const AntD = require('antd');
    const Select = AntD.Select;
    const Option = Select.Option;
    let op = [];
    if (options) {
        op = options;
        if (!required && !(fieldType === Array)) {
            op.unshift({value: '...', label: '...'});
        }
    } else {
        op = allowedValues;
        if (!required && !(fieldType === Array)) {
            op.unshift('...');
        }
    }
    return (
        <Select
            disabled={disabled}
            multiple={fieldType === Array}
            allowClear={fieldType === Array}
            id={id}
            name={name}
            onChange={value => onChange(value)}
            ref={inputRef}
            defaultValue={defaultValue}
        >
            {op.map(val => {
                let v = '';
                if (val instanceof Object) {
                    v = (
                        <Option key={val.value} value={val.value}>
                            {val.label}
                        </Option>
                    );
                } else {
                    v = (
                        <Option key={val} value={val}>
                            {transform ? transform(val) : val}
                        </Option>
                    );
                }
                return v;
            })}
        </Select>
    );
};


class Select extends (React.Component) {
    constructor () {
        super(...arguments);
        this.state = {
        };
    }
    componentWillMount () {
        this.props.onChange(this.props.defaultValue);
    }
    render () {
        const {
            props: {allowedValues,
            checkboxes,
            disabled,
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
            options,
            defaultValue
        },
        props
        } = this;
        const AntD = require('antd');
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
                {checkboxes
                    ? renderCheckboxesAD({
                        allowedValues,
                        disabled,
                        id,
                        name,
                        onChange,
                        transform,
                        value,
                        fieldType,
                        options,
                        defaultValue,
                        ...props
                    })
                    : renderSelectAD({
                        allowedValues,
                        disabled,
                        required,
                        id,
                        name,
                        onChange,
                        transform,
                        value,
                        inputRef,
                        placeholder,
                        label,
                        options,
                        fieldType,
                        defaultValue,
                        ...props
                    })}
            </FormItem>
        );
    }
}


export default connectField(Select);
