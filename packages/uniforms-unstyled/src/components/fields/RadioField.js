import React            from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const Radio = ({
    allowedValues,
    disabled,
    id,
    label,
    name,
    onChange,
    transform,
    value,
    ...props
}) =>
    <section {...filterDOMProps(props)}>
        {label && (
            <label>
                {label}
            </label>
        )}

        {allowedValues.map(item =>
            <section key={item}>
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
            </section>
        )}
    </section>
;

export default connectField(Radio);
