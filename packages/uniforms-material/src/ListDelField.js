import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import RaisedButton   from 'material-ui/RaisedButton';
import React          from 'react';
import Remove         from 'material-ui/svg-icons/content/remove';

const ListDel = ({
    disabled,
    name,
    parent,
    deletationLabel = 'Remove',
    icon: Icon = Remove,
    iconVisible = false,
    ...props
}) => {
    const fieldIndex      = +name.slice(1 + name.lastIndexOf('.'));
    const limitNotReached = !disabled && !(parent.minCount >= parent.value.length);

    return (
        <RaisedButton
            disabled={!limitNotReached}
            icon={iconVisible && <Icon /> || null}
            label={deletationLabel}
            onTouchTap={() => limitNotReached && parent.onChange(
                [].concat(parent.value.slice(0,  fieldIndex)).concat(parent.value.slice(1 + fieldIndex))
            )}
            {...filterDOMProps(props)}
        />
    );
};

export default connectField(ListDel, {includeParent: true, initialValue: false});
