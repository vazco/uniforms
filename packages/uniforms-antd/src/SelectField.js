import Checkbox     from 'antd/lib/checkbox';
import React        from 'react';
import Select       from 'antd/lib/select';
import connectField from 'uniforms/connectField';

import wrapField from './wrapField';

const xor = (item, array) => {
    const index = array.indexOf(item);
    if (index === -1) {
        return array.concat([item]);
    }

    return array.slice(0, index).concat(array.slice(index + 1));
};

const renderCheckboxes = props =>
    <Checkbox.Group
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
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
        props.checkboxes || props.fieldType === Array
            ? renderCheckboxes(props)
            : renderSelect(props)
    ))
;

Select_.displayName = 'Select';

export default connectField(Select_);
