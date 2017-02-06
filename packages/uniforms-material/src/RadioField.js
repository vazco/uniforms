import RadioButton    from 'material-ui/RadioButton';
import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import {ListItem}     from 'material-ui/List';
import {List}         from 'material-ui/List';

const Radio = ({
    allowedValues,
    disabled,
    id,
    label,
    name,
    onChange,
    transform,
    value,
    ...props
}) =>
    <List {...filterDOMProps(props)}>
        {!!label && (
            <ListItem
                disabled
                primaryText={label}
            />
        )}

        {allowedValues.map(item =>
            <ListItem
                disabled={disabled}
                id={`${id}-${item}`}
                key={item}
                name={name}
                primaryText={transform ? transform(item) : item}
                rightToggle={(
                    <RadioButton
                        labelPosition="left"
                        checked={value === item}
                        onCheck={() => onChange(item)}
                    />
                )}
            />
        )}
    </List>
;

export default connectField(Radio);
