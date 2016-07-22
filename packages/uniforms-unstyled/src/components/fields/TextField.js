import React            from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const Text = ({
    disabled,
    id,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    type,
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
            name={name}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            ref={inputRef}
            type={type}
            value={value}
        />
    </section>
;

Text.defaultProps = {
    type: 'text'
};

export default connectField(Text);
