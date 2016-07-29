import React            from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const xor = (item, array) => {
    let index = array.indexOf(item);
    if (index === -1) {
        return array.concat([item]);
    }

    return array.slice(0, index).concat(array.slice(index + 1));
};

const renderCheckboxes = ({allowedValues, disabled, fieldType, id, name, onChange, transform, value}) =>
    allowedValues.map(item =>
        <section key={item}>
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
    )
;

const renderSelect = ({allowedValues, disabled, id, inputRef, name, onChange, placeholder, transform, value}) =>
    <select
        disabled={disabled}
        id={id}
        name={name}
        onChange={event => onChange(event.target.value)}
        ref={inputRef}
        value={value}
    >
        {!!placeholder && (
            <option value="" disabled hidden>
                {placeholder}
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
    transform,
    value,
    ...props
}) =>
    <section {...filterDOMProps(props)}>
        {label && (
            <label htmlFor={id}>
                {label}
            </label>
        )}

        {checkboxes || fieldType === Array
            ? renderCheckboxes({allowedValues, disabled, id, name, onChange, transform, value, fieldType})
            : renderSelect    ({allowedValues, disabled, id, name, onChange, transform, value, placeholder, inputRef})}
    </section>
;

export default connectField(Select);
