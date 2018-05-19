import connectField   from 'uniforms/connectField';
import DeleteIcon     from '@material-ui/icons/Delete';
import filterDOMProps from 'uniforms/filterDOMProps';
import IconButton     from '@material-ui/core/IconButton';
import React          from 'react';

const ListDel = ({
    disabled,
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
            <DeleteIcon />
        </IconButton>
    );
};

export default connectField(ListDel, {includeParent: true, initialValue: false});
