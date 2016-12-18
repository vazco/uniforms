import IconButton       from 'material-ui/IconButton';
import React            from 'react';
import Remove           from 'material-ui/svg-icons/content/remove';
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
        <IconButton
            onTouchTap={() => limitNotReached && parent.onChange([]
                .concat(parent.value.slice(0,  fieldIndex))
                .concat(parent.value.slice(1 + fieldIndex))
            )}
            {...filterDOMProps(props)}
        >
            <Remove />
        </IconButton>
    );
};

export default connectField(ListDel, {includeParent: true, initialValue: false});
