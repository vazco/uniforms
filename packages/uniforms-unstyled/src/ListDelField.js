import React            from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

const ListDel = ({
    disabled,
    name,
    parent,
    ...props
}) => {
    const fieldIndex      = +name.slice(1 + name.lastIndexOf('.'));
    const limitNotReached = !disabled && !(parent.minCount >= parent.value.length);

    return (
        <span
            {...filterDOMProps(props)}
            onClick={() => limitNotReached && parent.onChange([]
                .concat(parent.value.slice(0,  fieldIndex))
                .concat(parent.value.slice(1 + fieldIndex))
            )}
        >
            -
        </span>
    );
};

export default connectField(ListDel, {includeParent: true, initialValue: false});
