import Input          from 'antd/lib/input';
import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

import wrapField from './wrapField';

const Text = props =>
    wrapField(props, (
        <Input
            disabled={props.disabled}
            id={props.id}
            name={props.name}
            onChange={event => props.onChange(event.target.value)}
            placeholder={props.placeholder}
            ref={props.inputRef}
            value={props.value}
            {...filterDOMProps(props)}
        />
    ))
;

Text.defaultProps = {
    type: 'text'
};

export default connectField(Text);
