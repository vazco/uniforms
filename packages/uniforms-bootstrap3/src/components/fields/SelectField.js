import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

import FormGroup from './FormGroup';

const Select = props =>
    <FormGroup {...props}>
        <select
            className={classnames(
                props.inputClassName,
                'c-select',
                'form-control',
                {'form-control-danger': props.error}
            )}
            disabled={props.disabled}
            name={props.name}
            onChange={event => props.onChange(event.target.value)}
            value={props.value}
        >
            {props.placeholder && (
                <option value="" disabled hidden>
                    {props.placeholder}
                </option>
            )}

            {props.allowedValues.map(value =>
                <option key={value} value={value}>
                    {props.transform ? props.transform(value) : value}
                </option>
            )}
        </select>
    </FormGroup>
;

export default connectField(Select);

