import React          from 'react';
import classnames     from 'classnames';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const Text = ({
    className,
    disabled,
    error,
    errorMessage,
    icon,
    iconLeft,
    iconProps,
    id,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    required,
    showInlineError,
    type,
    value,
    ...props
}) =>
    <section className={classnames(className, {disabled, error, required}, 'field')} {...filterDOMProps(props)}>
        {label && (
            <label htmlFor={id}>
                {label}
            </label>
        )}

        <section className={classnames('ui', {left: iconLeft, icon: icon || iconLeft}, 'input')}>
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

            {(icon || iconLeft) && (
                <i className={`${icon || iconLeft} icon`} {...iconProps} />
            )}
        </section>

        {!!(errorMessage && showInlineError) && (
            <section className="ui red basic pointing label">
                {errorMessage}
            </section>
        )}
    </section>
;

Text.defaultProps = {
    type: 'text'
};

export default connectField(Text);
