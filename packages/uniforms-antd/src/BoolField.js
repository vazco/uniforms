import Icon           from 'antd/lib/icon';
import React          from 'react';
import Switch         from 'antd/lib/switch';
import Checkbox       from 'antd/lib/checkbox';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

import wrapField from './wrapField';

const Bool = props =>
    wrapField(props, (
        props.checkbox ?
            <Checkbox
                checked={props.value}
                disabled={props.disabled}
                id={props.id}
                name={props.name}
                onChange={() => props.onChange(!props.value)}
                ref={props.inputRef}
                {...filterDOMProps(props)}
            /> :
            <Switch
                checked={props.value}
                disabled={props.disabled}
                id={props.id}
                name={props.name}
                onChange={() => props.onChange(!props.value)}
                ref={props.inputRef}
                {...filterDOMProps(props)}
            />
    ))
;

Bool.defaultProps = {
    checkbox: false,
    checkedChildren:   <Icon type="check" />,
    unCheckedChildren: <Icon type="cross" />
};

export default connectField(Bool, {ensureValue: false});
