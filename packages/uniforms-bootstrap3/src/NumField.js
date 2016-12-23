import React        from 'react';
import classnames   from 'classnames';
import connectField from 'uniforms/connectField';

import wrapField from './wrapField';

const noneIfNaN = x => isNaN(x) ? undefined : x;

const Num = props =>
    wrapField(props, (
        <input
            className={classnames(props.inputClassName, 'form-control', {'form-control-danger': props.error})}
            disabled={props.disabled}
            id={props.id}
            max={props.max}
            min={props.min}
            name={props.name}
            onChange={event => props.onChange(noneIfNaN((props.decimal ? parseFloat : parseInt)(event.target.value)))}
            placeholder={props.placeholder}
            ref={props.inputRef}
            step={props.decimal ? 0.01 : 1}
            type="number"
            value={props.value}
        />
    ))
;

export default connectField(Num);
