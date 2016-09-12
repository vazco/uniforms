import React            from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const noneIfNaN = x => isNaN(x) ? undefined : x;

const Num = ({
    decimal,
    disabled,
    id,
    inputRef,
    label,
    max,
    min,
    name,
    onChange,
    placeholder,
    value,
    ...props
}) =>
    <section {...filterDOMProps(props)}>
        {label && (
            <label htmlFor={id}>
                {label}
            </label>
        )}

        <input
            disabled={disabled}
            id={id}
            max={max}
            min={min}
            name={name}
            onChange={event => onChange(noneIfNaN((decimal ? parseFloat : parseInt)(event.target.value)))}
            placeholder={placeholder}
            ref={inputRef}
            step={decimal ? 0.01 : 1}
            type="number"
            value={value === undefined ? null : value}
        />
    </section>
;

export default connectField(Num);
