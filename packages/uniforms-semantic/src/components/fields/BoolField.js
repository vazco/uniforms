import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

const Bool = ({className, disabled, error, field: {optional}, label, name, value, onChange, ...props}) =>
    <section className={classnames(className, {disabled, error, required: !optional}, 'field')} {...props}>
        <section className="ui checkbox">
            <input
                checked={value}
                className="hidden"
                disabled={disabled}
                name={name}
                onChange={() => onChange(!value)}
                type="checkbox"
            />

            <label onClick={() => onChange(!value)}>
                {label}
            </label>
        </section>
    </section>
;

export default connectField(Bool);
