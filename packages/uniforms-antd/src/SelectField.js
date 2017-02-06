import Checkbox     from 'antd/lib/checkbox';
import React        from 'react';
import Select       from 'antd/lib/select';
import connectField from 'uniforms/connectField';

import wrapField from './wrapField';

const renderCheckboxes = props =>
    <Checkbox.Group
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        onChange={value => props.onChange(value)}
        options={props.options || props.allowedValues}
        value={props.value}
    />
;

const renderSelect = props =>
    <Select
        allowClear={!props.required}
        disabled={props.disabled}
        id={props.id}
        multiple={props.fieldType === Array}
        name={props.name}
        onChange={value => props.onChange(value)}
        ref={props.inputRef}
        value={props.value}
    >
        {props.allowedValues.map(value =>
            <Select.Option key={value} value={value}>
                {props.transform ? props.transform(value) : value}
            </Select.Option>
        )}
    </Select>
;

const Select_ = props =>
    wrapField(props, (
        props.checkboxes
            ? renderCheckboxes(props)
            : renderSelect(props)
    ))
;

Select_.displayName = 'Select';

export default connectField(Select_);
