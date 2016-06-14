import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const Bool = ({
    className,
    disabled,
    error,
    id,
    label,
    name,
    onChange,
    required,
    value,
    ...props
}) =>
    <section className={classnames(className, {disabled, error, required}, 'field')} {...props}>
        <section className="ui checkbox">
            <input
                checked={value}
                className="hidden"
                disabled={disabled}
                id={id}
                name={name}
                onChange={() => onChange(!value)}
                type="checkbox"
            />

            <label htmlFor={id}>
                {label}
            </label>
        </section>
    </section>
;

export default connectField(Bool);
