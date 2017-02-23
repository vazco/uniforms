import Add            from 'material-ui/svg-icons/content/add';
import RaisedButton   from 'material-ui/RaisedButton';
import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const ListAdd = ({
    disabled,
    icon: Icon,
    iconVisible,
    parent,
    value,
    ...props
}) => {
    const limitNotReached = !disabled && !(parent.maxCount <= parent.value.length);

    return (
        <RaisedButton
            disabled={!limitNotReached}
            icon={iconVisible ? <Icon /> : undefined}
            onTouchTap={() => limitNotReached && parent.onChange(parent.value.concat([value]))}
            {...filterDOMProps(props)}
        />
    );
};

ListAdd.defaultProps = {
    children: 'Add',
    icon: Add,
    iconVisible: false
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
