import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

import wrapField from '../../lib/wrapField';

const Bool = ({label, labelBefore, ...props}) =>
    wrapField({label: labelBefore, ...props}, (
        <section className={classnames(props.inputClassName, `checkbox${props.inline ? '-inline' : ''}`)}>
            <label htmlFor={props.id}>
                <input
                    checked={props.value}
                    disabled={props.disabled}
                    id={props.id}
                    name={props.name}
                    onChange={() => props.onChange(!props.value)}
                    ref={props.inputRef}
                    type="checkbox"
                />
                &nbsp;
                {label}
            </label>
        </section>
    ))
;

export default connectField(Bool);

