import React        from 'react';
import classnames   from 'classnames';
import connectField from 'uniforms/connectField';

import wrapField from './wrapField';

const Text = props =>
    wrapField(props, (
        <input
            className={classnames(props.inputClassName, 'form-control', {'form-control-danger': props.error})}
            disabled={props.disabled}
            id={props.id}
            name={props.name}
            onChange={event => props.onChange(event.target.value)}
            placeholder={props.placeholder}
            ref={props.inputRef}
            type={props.type}
            value={props.value}
        />
    ))
;

Text.defaultProps = {type: 'text'};

export default connectField(Text);
