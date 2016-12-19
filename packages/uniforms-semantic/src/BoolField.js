import React          from 'react';
import classnames     from 'classnames';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const Bool = ({
    className,
    disabled,
    error,
    errorMessage,
    id,
    inputRef,
    label,
    name,
    onChange,
    required,
    showInlineError,
    value,
    ...props
}) =>
    <section className={classnames(className, {disabled, error, required}, 'field')} {...filterDOMProps(props)}>
        <section className="ui checkbox">
            <input
                checked={value}
                className="hidden"
                disabled={disabled}
                id={id}
                name={name}
                onChange={() => onChange(!value)}
                ref={inputRef}
                type="checkbox"
            />

            <label htmlFor={id}>
                {label}
            </label>
        </section>

        {!!(errorMessage && showInlineError) && (
            <section className="ui red basic pointing label">
                {errorMessage}
            </section>
        )}
    </section>
;

export default connectField(Bool);
