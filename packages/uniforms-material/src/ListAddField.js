import Button         from 'material-ui/Button';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import React          from 'react';

const ListAdd = ({
    disabled,
    parent,
    value,
    ...props
}) => {
    const limitNotReached = !disabled && !(parent.maxCount <= parent.value.length);

    return (
        <Button
            disabled={!limitNotReached}
            onClick={() => limitNotReached && parent.onChange(parent.value.concat([value]))}
            {...filterDOMProps(props)}
        >
            {Button}
        </Button>
    );
};

ListAdd.defaultProps = {
    label: 'Add'
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
