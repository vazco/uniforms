import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

import FormGroup from './FormGroup';

const Num = props =>
    <FormGroup {...props}>
        <input
            className={classnames(props.inputClassName, 'form-control', {'form-control-danger': props.error})}
            disabled={props.disabled}
            id={props.id}
            max={props.max}
            min={props.min}
            name={props.name}
            onChange={event => props.onChange((props.decimal ? parseFloat : parseInt)(event.target.value) || undefined)}
            placeholder={props.placeholder}
            ref={props.inputRef}
            step={props.decimal ? 0.01 : 1}
            type="number"
            value={props.value === undefined ? null : props.value}
        />
    </FormGroup>
;

export default connectField(Num);
