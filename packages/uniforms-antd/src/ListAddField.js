import connectField     from 'uniforms/connectField';
import React            from 'react';

const ListAdd = ({
    disabled,
    parent,
    value
}) => {
    const limitNotReached = !disabled && !(parent.maxCount <= parent.value.length);
    const AntIn = require('antd');
    const Button = AntIn.Button;
    return (
        <Button
            size="small"
            type="dashed"
            icon="plus-square-o"
            onClick={() => limitNotReached && parent.onChange(parent.value.concat([value]))}
            style={{width: '100%'}}
        />
    );
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
