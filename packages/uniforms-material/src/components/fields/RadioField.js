import RadioButton      from 'material-ui/RadioButton';
import React            from 'react';
import Subheader        from 'material-ui/Subheader';
import {ListItem}       from 'material-ui/List';
import {List}           from 'material-ui/List';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';

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
            <Subheader>
                {label}
            </Subheader>
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
