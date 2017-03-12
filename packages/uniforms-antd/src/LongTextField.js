import Input          from 'antd/lib/input';
import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

import wrapField from './wrapField';

const LongText = props =>
    wrapField(props, (
        <Input
            disabled={props.disabled}
            id={props.id}
            name={props.name}
            onChange={event => props.onChange(event.target.value)}
            placeholder={props.placeholder}
            ref={props.inputRef}
            type="textarea"
            value={props.value}
            {...filterDOMProps(props)}
        />
    ))
;

LongText.defaultProps = {
    rows: 5
};

export default connectField(LongText);
