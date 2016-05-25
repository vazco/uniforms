import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

import FormGroup from './FormGroup';

const Text = props =>
    <FormGroup feedbackable {...props}>
        <input
            className={classnames(
                props.inputClassName,
                'form-control',
            )}
            disabled={props.disabled}
            name={props.name}
            onChange={event => props.onChange(event.target.value)}
            placeholder={props.placeholder}
            type="text"
            value={props.value}
        />
        {props.error ?
            <span className="glyphicon glyphicon-remove form-control-feedback" />
            : ''
        }
    </FormGroup>
;

export default connectField(Text);
