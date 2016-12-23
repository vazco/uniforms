import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const LongText = ({
    disabled,
    id,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    value,
    ...props
}) =>
    <section {...filterDOMProps(props)}>
        {label && (
            <label>
                {label}
            </label>
        )}

        <textarea
            disabled={disabled}
            id={id}
            name={name}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            ref={inputRef}
            value={value}
        />
    </section>
;

export default connectField(LongText);
