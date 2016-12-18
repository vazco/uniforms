import RadioButton      from 'material-ui/RadioButton';
import React            from 'react';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {ListItem}       from 'material-ui/List';
import {List}           from 'material-ui/List';

/*
 * TODO: Investigate why the checkboxes needed to be unpacked
 */
const Radio = ({
    allowedValues,
    disabled,
    id,
    label,
    name,
    onChange,
    transform,
    value,
    checkboxes, // eslint-disable-line no-unused-vars
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
