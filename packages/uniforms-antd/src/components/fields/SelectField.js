import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const xor = (item, array) => {
    const index = array.indexOf(item);
    if (index === -1) {
        return array.concat([item]);
    }

    return array.slice(0, index).concat(array.slice(index + 1));
};

const renderCheckboxes = ({
    allowedValues,
    disabled,
    fieldType,
    id,
    name,
    onChange,
    transform,
    value,
    multiple
}) =>
allowedValues.map((item) =>{
    const AntD = require('antd');

    return(
        <section className="field" key={item}>
            <section className="ui checkbox">
                <input
                    checked={fieldType === Array ? value.includes(item) : value === item}
                    disabled={disabled}
                    id={`${id}-${item}`}
                    name={name}
                    onChange={() => onChange(fieldType === Array ? xor(item, value) : item)}
                    type="checkbox"
                />

                <label htmlFor={`${id}-${item}`}>
                    {transform ? transform(item) : item}
                </label>
            </section>
        </section>
    )
    })
;

const renderSelect = ({
    allowedValues,
    disabled,
    id,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    required,
    transform,
    value,
    multiple,
    ...props
}) =>{
    const AntD = require('antd');
    const Select = AntD.Select;
    const Option = Select.Option;
    return(
    <Select
        disabled={disabled}
        multiple={multiple}
        id={id}
        name={name}
        onChange={(value) => onChange(value)}
        ref={inputRef}
    >
        {(!!placeholder || !required) && (
            <Option value="" disabled={required} hidden={required}>
                {placeholder ? placeholder : label}
            </Option>
       )}

        {allowedValues.map((val) => {
            console.log('val')
            console.log(val)
            return(
            <Option key={val} value={val}>
                {transform ? transform(val) : val}
            </Option>
        )}
       )}
    </Select>
)
}
;

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
    ...props
}) =>{
    const AntD = require('antd');
    const Form = AntD.Form;
    const FormItem = Form.Item;
    console.log(checkboxes)
    console.log(fieldType)
    console.log(multiple)
return(
    <FormItem
        label={label}
        help={showInlineError ? errorMessage : null}
        hasFeedback={true}
        validateStatus={errorMessage ? 'error' : null}
        htmlFor={id}>
        {checkboxes || (fieldType && !multiple) === Array
            ? renderCheckboxes({allowedValues, disabled, id, name, onChange, transform, value, fieldType,multiple})
            : renderSelect    ({allowedValues, disabled, id, name, onChange, transform, value, inputRef, placeholder,multiple, ...props})}
    </FormItem>
)
}
;

export default connectField(Select);
