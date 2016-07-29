import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

import FormGroup from './FormGroup';

const xor = (item, array) => {
    let index = array.indexOf(item);
    if (index === -1) {
        return array.concat([item]);
    }

    return array.slice(0, index).concat(array.slice(index + 1));
};

const renderCheckboxes = props =>
    props.allowedValues.map(item =>
        <section key={item} className={classnames(props.inputClassName, `checkbox${props.inline ? '-inline' : ''}`)}>
            <label htmlFor={`${props.id}-${item}`}>
                <input
                    checked={props.fieldType === Array ? props.value.includes(item) : props.value === item}
                    disabled={props.disabled}
                    id={`${props.id}-${item}`}
                    name={props.name}
                    onChange={() => props.onChange(props.fieldType === Array ? xor(item, props.value) : item)}
                    type="checkbox"
                />
                {props.transform ? props.transform(item) : item}
            </label>
        </section>
    )
;

const renderSelect = props =>
    <select
        className={classnames(props.inputClassName, 'form-control', {'form-control-danger': props.error})}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        onChange={event => props.onChange(event.target.value)}
        ref={props.inputRef}
        value={props.value}
    >
        {!!props.placeholder && (
            <option value="" disabled hidden>
                {props.placeholder}
            </option>
        )}

        {props.allowedValues.map(value =>
            <option key={value} value={value}>
                {props.transform ? props.transform(value) : value}
            </option>
        )}
    </select>
;

const Select = props =>
    <FormGroup {...props}>
        {props.checkboxes || props.fieldType === Array
            ? renderCheckboxes(props)
            : renderSelect(props)}
    </FormGroup>
;

export default connectField(Select);

