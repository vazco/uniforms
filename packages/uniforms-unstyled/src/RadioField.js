import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const Radio = ({
    allowedValues,
    checkboxes, // eslint-disable-line no-unused-vars
    disabled,
    id,
    label,
    name,
    onChange,
    transform,
    value,
    ...props
}) =>
    <div {...filterDOMProps(props)}>
        {label && (
            <label>
                {label}
            </label>
        )}

        {allowedValues.map(item =>
            <div key={item}>
                <input
                    checked={item === value}
                    disabled={disabled}
                    id={`${id}-${item}`}
                    name={name}
                    onChange={() => onChange(item)}
                    type="radio"
                />

                <label htmlFor={`${id}-${item}`}>
                    {transform ? transform(item) : item}
                </label>
            </div>
        )}
    </div>
;

export default connectField(Radio);
