import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

// eslint-disable-next-line max-len
const LongText = ({className, disabled, error, field: {optional}, label, name, placeholder, value, onChange, ...props}) =>
    <section className={classnames(className, {disabled, error, required: !optional}, 'field')} {...props}>
        {label && (
            <label>
                {label}
            </label>
        )}

        <textarea
            disabled={disabled}
            name={name}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            type="text"
            value={value}
        />
    </section>
;

export default connectField(LongText);
