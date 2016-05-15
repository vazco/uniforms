import React          from 'react';
import {connectField} from 'uniforms';

const ListAdd = ({disabled, parent, value, ...props}) => {
    const limitNotReached = !(parent.maxCount <= value.length);

    return (
        <span {...props} onClick={() => limitNotReached && !disabled && parent.onChange(parent.value.concat([value]))}>
            +
        </span>
    );
};

export default connectField(ListAdd, {includeParent: true, includeDefault: false});
