import Add            from 'material-ui/svg-icons/content/add';
import RaisedButton   from 'material-ui/RaisedButton';
import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const ListAdd = ({
    disabled,
    parent,
    value,
    addLabel = 'Add',
    icon: Icon = Add,
    iconVisible = false,
    ...props
}) => {
    const limitNotReached = !disabled && !(parent.maxCount <= value.length);

    return (
        <RaisedButton
            disabled={!limitNotReached}
            icon={iconVisible && <Icon /> || null}
            label={addLabel}
            onTouchTap={() => limitNotReached && parent.onChange(parent.value.concat([value]))}
            {...filterDOMProps(props)}
        />
    );
};

export default connectField(ListAdd, {includeParent: true, initialValue: false});
