import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

import FormGroup from './FormGroup';

const Text = props =>
    <FormGroup feedbackable {...props}>
        <input
            className={classnames(props.inputClassName, 'form-control', {'form-control-danger': props.error})}
            disabled={props.disabled}
            name={props.name}
            onChange={event => props.onChange(event.target.value)}
            placeholder={props.placeholder}
            type={typeof props.type === 'function' ? 'text' : props.type}
            value={props.value}
        />

        {props.error && (
            <i className="glyphicon glyphicon-remove form-control-feedback" />
        )}
    </FormGroup>
;

export default connectField(Text);
