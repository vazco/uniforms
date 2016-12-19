import React          from 'react';
import classnames     from 'classnames';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const LongText = ({
    className,
    disabled,
    error,
    errorMessage,
    id,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    required,
    showInlineError,
    value,
    ...props
}) =>
    <section className={classnames(className, {disabled, error, required}, 'field')} {...filterDOMProps(props)}>
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

        {!!(errorMessage && showInlineError) && (
            <section className="ui red basic pointing label">
                {errorMessage}
            </section>
        )}
    </section>
;

export default connectField(LongText);
