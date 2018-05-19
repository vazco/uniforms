import connectField   from 'uniforms/connectField';
import AddIcon        from '@material-ui/icons/Add';
import filterDOMProps from 'uniforms/filterDOMProps';
import IconButton     from '@material-ui/core/IconButton';
import React          from 'react';
import FormControl    from '@material-ui/core/FormControl';

const ListAdd = ({
    disabled,
    fullWidth,
    margin,
    parent,
    value,
    ...props
}) => {
    const limitNotReached = !disabled && !(parent.maxCount <= parent.value.length);

    return (
        <FormControl fullWidth={!!fullWidth} margin={margin}>
            <IconButton
                disabled={!limitNotReached}
                onClick={() => limitNotReached && parent.onChange(parent.value.concat([value]))}
                {...filterDOMProps(props)}
            >
                <AddIcon />
            </IconButton>
        </FormControl>
    );
};

ListAdd.defaultProps = {
    fullWidth: true,
    margin: 'normal'
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
