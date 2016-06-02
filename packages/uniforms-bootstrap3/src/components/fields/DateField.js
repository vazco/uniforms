import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

import FormGroup from './FormGroup';

const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, onChange) => {
    let date = new Date(timestamp);
    if (date.getFullYear() < 10000) {
        onChange(date);
    }
};

const Date_ = props =>
    <FormGroup {...props}>
        <input
            className={classnames(props.inputClassName, 'form-control', {'form-control-danger': props.error})}
            disabled={props.disabled}
            max={dateFormat(props.max)}
            min={dateFormat(props.min)}
            name={props.name}
            onChange={event => dateParse(event.target.valueAsNumber, props.onChange)}
            type="datetime-local"
            value={dateFormat(props.value)}
        />
    </FormGroup>
;

Date_.displayName = 'Date';

export default connectField(Date_);
