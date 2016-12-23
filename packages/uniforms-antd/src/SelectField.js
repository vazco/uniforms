import React            from 'react';
import {connectField}   from 'uniforms';
import FormGroup from './FormGroup';
import _ from 'lodash';

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
    value
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
            value={value}
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
    value
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
            onChange={value => onChange(fieldType === Array ? _.without(value,null,undefined) : value)}
            ref={inputRef}
            value={fieldType === Array ? _.without(value,null,undefined) : value }
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


export class Select extends (React.Component) {
    constructor () {
        super(...arguments);
        this.state = {
        };
    }
    componentWillMount () {
        if (!this.props.value) {
            this.props.onChange(this.props.defaultValue);
            return;
        }
        if (this.props.fieldType !== Array) {
            return;
        }
        if (!this.props.value[0]) {
            this.props.onChange(this.props.defaultValue);
        }
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
            info
        },
        props
        } = this;
        return (
            <FormGroup
                errorMessage={errorMessage}
                id={id}
                label={label}
                showInlineError={showInlineError}
                info={info}
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
                        ...props
                    })}
            </FormGroup>
        );
    }
}


export default connectField(Select);
