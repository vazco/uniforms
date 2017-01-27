import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const xor = (item, array) => {
    const index = array.indexOf(item);
    if (index === -1) {
        return array.concat([item]);
    }

    return array.slice(0, index).concat(array.slice(index + 1));
};

const renderCheckboxes = ({allowedValues, disabled, fieldType, id, name, onChange, transform, value}) =>
    allowedValues.map(item =>
        <div key={item}>
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
        </div>
    )
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
    value
}) =>
    <select
        disabled={disabled}
        id={id}
        name={name}
        onChange={event => onChange(event.target.value)}
        ref={inputRef}
        value={value}
    >
        {(!!placeholder || !required) && (
            <option value="" disabled={required} hidden={required}>
                {placeholder ? placeholder : label}
            </option>
        )}

        {allowedValues.map(value =>
            <option key={value} value={value}>
                {transform ? transform(value) : value}
            </option>
        )}
    </select>
;

const Select = ({
    allowedValues,
    checkboxes,
    disabled,
    fieldType,
    id,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    required,
    transform,
    value,
    ...props
}) =>
    <div {...filterDOMProps(props)}>
        {label && (
            <label htmlFor={id}>
                {label}
            </label>
        )}

        {/* TODO: Better handling of these props. */}
        {/* eslint-disable max-len */}
        {checkboxes || fieldType === Array
            ? renderCheckboxes({allowedValues, disabled, id, name, onChange, transform, value, fieldType})
            : renderSelect    ({allowedValues, disabled, id, name, onChange, transform, value, inputRef, label, placeholder, required})
        }
        {/* eslint-enable */}
    </div>
;

export default connectField(Select);
