import React            from 'react';
import classnames       from 'classnames';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const ListAdd = ({
    className,
    disabled,
    parent,
    value,
    fieldData,
    ...props
}) => {
    const limitNotReached = !disabled && !(parent.maxCount <= parent.value.length);
    const AntIn = require('antd');
    const Button = AntIn.Button;
    return (
            <Button
                type="ghost"
                size="small"
                type="dashed"
                icon="plus-square-o"
                onClick={() => limitNotReached && parent.onChange(parent.value.concat([value]))}
                style={{width: '100%'}}
                {...filterDOMProps(props)}
            />
    );
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
