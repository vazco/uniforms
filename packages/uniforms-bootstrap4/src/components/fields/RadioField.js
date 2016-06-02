import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

import FormGroup from './FormGroup';

const Select = props =>
    <FormGroup {...props}>
        {props.allowedValues.map(item =>
            <section className={classnames(props.inputClassName, `radio${props.inline ? '-inline' : ''}`)}>
                <label onClick={() => props.onChange(item)}>
                    <input
                        checked={item === props.value}
                        disabled={props.disabled}
                        name={props.name}
                        onChange={() => props.onChange(item)}
                        type="radio"
                    />
                    {item}
                </label>
            </section>
        )}
    </FormGroup>
;

export default connectField(Select);

