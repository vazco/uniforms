import React            from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const ListDel = ({
    disabled,
    name,
    parent,
    fieldData,
    ...props
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
