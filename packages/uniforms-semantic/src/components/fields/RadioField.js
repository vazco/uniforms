import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const Radio = ({
    allowedValues,
    className,
    disabled,
    error,
    errorMessage,
    id,
    label,
    name,
    onChange,
    required,
    showInlineError,
    transform,
    value,
    ...props
}) =>
    <section className={classnames(className, {disabled, error}, 'grouped fields')} {...filterDOMProps(props)}>
        {label && (
            <section className={classnames({required}, 'field')}>
                <label>
                    {label}
                </label>
            </section>
        )}

        {allowedValues.map(item =>
            <section className="field" key={item}>
                <section className="ui radio checkbox">
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
            </section>
        )}

        {!!(errorMessage && showInlineError) && (
            <section className="ui red basic pointing label">
                {errorMessage}
            </section>
        )}
    </section>
;

export default connectField(Radio);
