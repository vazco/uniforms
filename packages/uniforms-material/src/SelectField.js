import Checkbox         from '@material-ui/core/Checkbox';
import connectField     from 'uniforms/connectField';
import filterDOMProps   from 'uniforms/filterDOMProps';
import FormControl      from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup        from '@material-ui/core/FormGroup';
import FormHelperText   from '@material-ui/core/FormHelperText';
import FormLabel        from '@material-ui/core/FormLabel';
import InputLabel       from '@material-ui/core/InputLabel';
import MenuItem         from '@material-ui/core/MenuItem';
import Radio            from '@material-ui/core/Radio';
import RadioGroup       from '@material-ui/core/RadioGroup';
import React            from 'react';
import Select           from '@material-ui/core/Select';
import Switch           from '@material-ui/core/Switch';

const xor = (item, array) => {
    const index = array.indexOf(item);
    if (index === -1) {
        return array.concat([item]);
    }

    return array.slice(0, index).concat(array.slice(index + 1));
};

const renderSelect = ({
    allowedValues,
    disabled,
    error,
    errorMessage,
    fieldType,
    fullWidth,
    id,
    inputProps,
    label,
    name,
    margin,
    native,
    onChange,
    required,
    showInlineError,
    transform,
    value,
    ...props
}) => {
    const Item = native ? 'option' : MenuItem;

    return (
        <FormControl
            disabled={!!disabled}
            error={!!error}
            fullWidth={!!fullWidth}
            margin={margin}
            required={required}
        >
            {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
            <Select
                inputProps={{name, id, ...inputProps}}
                multiple={fieldType === Array || undefined}
                native={native}
                onChange={event => disabled || onChange(event.target.value)}
                value={native && !value ? '' : value}
                {...filterDOMProps(props)}
            >
                {allowedValues.map(value =>
                    <Item key={value} value={value}>{transform ? transform(value) : value}</Item>
                )}
            </Select>
            {showInlineError && error && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};

const renderCheckboxes = ({
    allowedValues,
    appearance,
    disabled,
    error,
    errorMessage,
    fieldType,
    fullWidth,
    inputRef,
    label,
    legend,
    margin,
    name,
    onChange,
    required,
    showInlineError,
    transform,
    value,
    ...props
}) => {
    let children;

    if (fieldType !== Array) {
        children = (
            <RadioGroup
                name={name}
                onChange={event => disabled || onChange(event.target.value)}
                ref={inputRef}
                value={value}
            >
                {allowedValues.map(item => (
                    <FormControlLabel
                        control={<Radio {...filterDOMProps(props)} />}
                        key={item}
                        label={transform ? transform(item) : item}
                        value={item}
                    />
                ))}
                {showInlineError && error && <FormHelperText>{errorMessage}</FormHelperText>}
            </RadioGroup>
        );
    }

    const SelectionControl = appearance === 'checkbox' ? Checkbox : Switch;

    children = (
        <FormGroup>
            {allowedValues.map(item => (
                <FormControlLabel
                    control={<SelectionControl
                        checked={value.includes(item)}
                        onChange={() => disabled || onChange(xor(item, value))}
                        ref={inputRef}
                        value={props.name}
                        {...filterDOMProps(props)}
                    />}
                    key={item}
                    label={transform ? transform(item) : item}
                />
            ))}
        </FormGroup>
    );

    return (
        <FormControl
            component="fieldset"
            disabled={!!disabled}
            error={!!error}
            fullWidth={!!fullWidth}
            margin={margin}
            required={required}
        >
            {(legend || label) && <FormLabel component="legend">{legend || label}</FormLabel>}
            {children}
            {showInlineError && error && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};

const Select_ = ({checkboxes, ...props}) =>
    checkboxes
        ? renderCheckboxes(props)
        : renderSelect    (props)
;

Select_.defaultProps = {
    appearance: 'checkbox',
    fullWidth: true,
    margin: 'normal'
};

export default connectField(Select_);
