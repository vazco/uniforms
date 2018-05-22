import AddIcon        from '@material-ui/icons/Add';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import FormControl    from '@material-ui/core/FormControl';
import IconButton     from '@material-ui/core/IconButton';
import React          from 'react';

const ListAdd = ({
    disabled,
    fullWidth,
    icon: Icon,
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
                <Icon />
            </IconButton>
        </FormControl>
    );
};

ListAdd.defaultProps = {
    fullWidth: true,
    icon: AddIcon,
    margin: 'normal'
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
