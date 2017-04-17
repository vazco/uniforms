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
    <div {...filterDOMProps(props)}>
        {label && (
            <label htmlFor={id}>
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
    </div>
;

export default connectField(LongText);
