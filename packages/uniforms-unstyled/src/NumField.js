import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

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
    step,
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
            step={step || (decimal ? 0.01 : 1)}
            type="number"
            value={value}
        />
    </section>
;

export default connectField(Num);
