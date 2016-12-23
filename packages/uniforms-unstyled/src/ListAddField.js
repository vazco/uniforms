import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const ListAdd = ({
    disabled,
    parent,
    value,
    ...props
}) => {
    const limitNotReached = !disabled && !(parent.maxCount <= value.length);

    return (
        <span
            {...filterDOMProps(props)}
            onClick={() => limitNotReached && parent.onChange(parent.value.concat([value]))}
        >
            +
        </span>
    );
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
