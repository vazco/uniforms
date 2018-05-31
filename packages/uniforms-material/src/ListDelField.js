import IconButton     from '@material-ui/core/IconButton';
import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const ListDel = ({
    disabled,
    icon: Icon,
    name,
    parent,
    ...props
}) => {
    const fieldIndex      = +name.slice(1 + name.lastIndexOf('.'));
    const limitNotReached = !disabled && !(parent.minCount >= parent.value.length);

    return (
        <IconButton
            disabled={!limitNotReached}
            onClick={() => limitNotReached && parent.onChange([]
                .concat(parent.value.slice(0,  fieldIndex))
                .concat(parent.value.slice(1 + fieldIndex))
            )}
            {...filterDOMProps(props)}
        >
            {Icon ? <Icon /> : '-'}
        </IconButton>
    );
};

export default connectField(ListDel, {includeParent: true, initialValue: false});
