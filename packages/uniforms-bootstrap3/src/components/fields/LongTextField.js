import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';

import wrapField from '../../lib/wrapField';

const LongText = props =>
    wrapField(props, (
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
    ))
;

export default connectField(LongText);

