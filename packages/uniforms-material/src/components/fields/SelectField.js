import Checkbox         from 'material-ui/Checkbox';
import MenuItem         from 'material-ui/MenuItem';
import RadioButton      from 'material-ui/RadioButton';
import React            from 'react';
import SelectField      from 'material-ui/SelectField';
import {connectField}   from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {ListItem}       from 'material-ui/List';
import {List}           from 'material-ui/List';

const xor = (item, array) => {
    const index = array.indexOf(item);
    if (index === -1) {
        return array.concat([item]);
    }

    return array.slice(0, index).concat(array.slice(index + 1));
};

const renderCheckboxes = ({
    allowedValues,
    disabled,
    fieldType,
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
                rightToggle={fieldType === Array ? (
                    <Checkbox
                        labelPosition="left"
                        checked={value.includes(item)}
                        onCheck={() => onChange(xor(item, value))}
                    />
                ) : (
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

const renderSelect = ({
    allowedValues,
    disabled,
    errorMessage,
    id,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    transform,
    value,
    ...props
}) =>
    <ListItem
        disabled
        primaryText={(
            <SelectField
                disabled={disabled}
                errorText={errorMessage}
                floatingLabelText={label}
                hintText={placeholder}
                id={id}
                name={name}
                onChange={(event, index, value) => onChange(value)}
                ref={inputRef}
                value={value}
                {...filterDOMProps(props)}
            >
                {allowedValues.map(value =>
                    <MenuItem
                        key={value}
                        value={value}
                        primaryText={transform ? transform(value) : value}
                    />
                )}
            </SelectField>
        )}
    />
;

const Select = props =>
    props.checkboxes || props.fieldType === Array
        ? renderCheckboxes(props)
        : renderSelect    (props)
;

export default connectField(Select, {ensureValue: false});
