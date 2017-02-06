import DatePicker     from 'antd/lib/date-picker';
import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import moment         from 'moment';

import wrapField from './wrapField';

const Date_ = props =>
    wrapField(props, (
        <DatePicker
            disabled={props.disabled}
            id={props.id}
            name={props.name}
            onChange={value => props.onChange(value.toDate())}
            placeholder={props.placeholder}
            ref={props.inputRef}
            value={props.value && moment(props.value)}
            {...filterDOMProps(props)}
        />
    ))
;

Date_.displayName = 'Date';

Date_.defaultProps = {
    showTime: true,
    style: {width: '100%'}
};

export default connectField(Date_, {ensureValue: false});
