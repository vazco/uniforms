import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const noneIfNaN = x => isNaN(x) ? undefined : x;

const Num = ({
    className,
    decimal,
    disabled,
    error,
    icon,
    iconLeft,
    iconProps,
    id,
    inputRef,
    label,
    max,
    min,
    name,
    onChange,
    placeholder,
    required,
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

            {(icon || iconLeft) && (
                <i className={`${icon || iconLeft} icon`} {...iconProps} />
            )}
        </section>
    </section>
;

export default connectField(Num);
