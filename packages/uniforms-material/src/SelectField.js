import Checkbox       from 'material-ui/Checkbox';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import MenuItem       from 'material-ui/MenuItem';
import RadioButton    from 'material-ui/RadioButton';
import React          from 'react';
import SelectField    from 'material-ui/SelectField';
import Subheader      from 'material-ui/Subheader';
import {List}         from 'material-ui/List';

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
    labelPosition,
    name,
    onChange,
    transform,
    value,
    ...props
}) =>
    <List {...filterDOMProps(props)}>
        {!!label && <Subheader children={label} style={{paddingLeft: 0}} />}

        {allowedValues.map(item => fieldType === Array ? (
            <Checkbox
                checked={value.includes(item)}
                disabled={disabled}
                id={`${id}-${item}`}
                key={item}
                label={transform ? transform(item) : item}
                labelPosition={labelPosition}
                name={name}
                onCheck={() => onChange(xor(item, value))}
            />
        ) : (
            <RadioButton
                checked={value === item}
                disabled={disabled}
                id={`${id}-${item}`}
                key={item}
                label={transform ? transform(item) : item}
                labelPosition={labelPosition}
                name={name}
                onCheck={() => onChange(item)}
            />
        ))}
    </List>
;

const renderSelect = ({
    allowedValues,
    disabled,
    errorMessage,
    fullWidth = true,
    id,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    transform,
    ...props
}) =>
    <SelectField
        disabled={disabled}
        errorText={errorMessage}
        floatingLabelText={label}
        fullWidth={fullWidth}
        hintText={placeholder}
        id={id}
        multiple={props.fieldType === Array}
        name={name}
        onChange={(event, index, value) => onChange(value)}
        ref={inputRef}
        value={props.value}
        {...filterDOMProps(props)}
    >
        {allowedValues.map(value =>
            <MenuItem
                insetChildren={props.fieldType === Array}
                checked={props.fieldType === Array && props.value.includes(value)}
                key={value}
                primaryText={transform ? transform(value) : value}
                value={value}
            />
        )}
    </SelectField>
;

const Select = props =>
    props.checkboxes
        ? renderCheckboxes(props)
        : renderSelect    (props)
;

export default connectField(Select, {ensureValue: false});

filterDOMProps.register(
    'checkboxes'
);
