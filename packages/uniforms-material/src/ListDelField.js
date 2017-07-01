import RaisedButton   from 'material-ui/RaisedButton';
import React          from 'react';
import Remove         from 'material-ui/svg-icons/content/remove';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const ListDel = ({
    disabled,
    icon: Icon,
    iconVisible,
    name,
    parent,
    ...props
}) => {
    const fieldIndex      = +name.slice(1 + name.lastIndexOf('.'));
    const limitNotReached = !disabled && !(parent.minCount >= parent.value.length);

    return (
        <RaisedButton
            disabled={!limitNotReached}
            icon={iconVisible ? <Icon /> : undefined}
            onTouchTap={() => limitNotReached && parent.onChange([]
                .concat(parent.value.slice(0,  fieldIndex))
                .concat(parent.value.slice(1 + fieldIndex))
            )}
            {...filterDOMProps(props)}
        />
    );
};

ListDel.defaultProps = {
    children: 'Remove',
    icon: Remove,
    iconVisible: false
};

export default connectField(ListDel, {includeParent: true, initialValue: false});
