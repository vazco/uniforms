import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const Select = ({
    allowedValues,
    className,
    disabled,
    error,
    label,
    name,
    onChange,
    required,
    value,
    ...props
}) =>
    <section className={classnames(className, {disabled, error}, 'grouped fields')} {...props}>
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
                        name={name}
                        onChange={() => onChange(item)}
                        type="radio"
                    />
                    <label>
                        {item}
                    </label>
                </section>
            </section>
        )}
    </section>
;

export default connectField(Select);
