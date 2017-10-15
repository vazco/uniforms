import Button         from 'material-ui/Button';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import React          from 'react';

const ListAdd = ({
    disabled,
    labelText,
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
            {labelText}
        </Button>
    );
};

ListAdd.defaultProps = {
    labelText: 'Add'
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
