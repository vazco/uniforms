import React          from 'react';
import {connectField} from 'uniforms';

const ListAdd = ({disabled, parent: {field: {maxCount}, value: parentValue, onChange}, value, ...props}) => {
    const limitReached = !(maxCount <= value.length);

    return (
        <span {...props} onClick={() => limitReached && !disabled && onChange(parentValue.concat([value]))}>
            +
        </span>
    );
};

export default connectField(ListAdd, {includeParent: true, includeDefault: false});
