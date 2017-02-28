import Radio        from 'antd/lib/radio';
import React        from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps   from 'uniforms/filterDOMProps';

import wrapField from './wrapField';

const Radio_ = props =>
    wrapField(props, (
        <Radio.Group
            disabled={props.disabled}
            name={props.name}
            onChange={event => props.onChange(event.target.value)}
            value={props.value}
            {...filterDOMProps(props)}
        >
            {props.allowedValues.map(value =>
                <Radio
                    key={value}
                    value={value}
                    style={{
                        display: 'block',
                        height: '30px',
                        lineHeight: '30px'
                    }}
                >
                    {props.transform ? props.transform(value) : value}
                </Radio>
            )}
        </Radio.Group>
    ))
;

Radio_.displayName = 'Radio';

export default connectField(Radio_);
