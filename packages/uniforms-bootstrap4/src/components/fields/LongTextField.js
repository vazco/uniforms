import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

import FormGroup from './FormGroup';

const LongText = props =>
    <FormGroup {...props}>
        <textarea
            className={classnames(props.inputClassName, 'form-control', {'form-control-danger': props.error})}
            disabled={props.disabled}
            id={props.id}
            name={props.name}
            onChange={event => props.onChange(event.target.value)}
            placeholder={props.placeholder}
            ref={props.inputRef}
            value={props.value}
        />
    </FormGroup>
;

export default connectField(LongText);

