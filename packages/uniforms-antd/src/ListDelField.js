import connectField     from 'uniforms/connectField';
import React            from 'react';

const ListDel = ({
    disabled,
    name,
    parent
}) => {
    const fieldIndex      = +name.slice(1 + name.lastIndexOf('.'));
    const limitNotReached = !disabled && !(parent.minCount >= parent.value.length);
    const AntIn = require('antd');
    const Button = AntIn.Button;
    return (
        <Button
            type="ghost"
            shape="circle-outline"
            size="small"
            icon="delete"
            disabled={!limitNotReached || disabled}
            onClick={() => limitNotReached && parent.onChange(
              [].concat(parent.value.slice(0,  fieldIndex))
                .concat(parent.value.slice(1 + fieldIndex))
            )}
        />
    );
};

export default connectField(ListDel, {includeParent: true, initialValue: false});
