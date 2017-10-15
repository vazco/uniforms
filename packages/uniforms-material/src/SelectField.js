import Checkbox                                                              from 'material-ui/Checkbox';
import connectField                                                          from 'uniforms/connectField';
import filterDOMProps                                                        from 'uniforms/filterDOMProps';
import Input, {InputLabel}                                                   from 'material-ui/Input';
import PropTypes                                                             from 'prop-types';
import React                                                                 from 'react';
import Select                                                                from 'material-ui/Select';
import {FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel} from 'material-ui/Form';
import {MenuItem}                                                            from 'material-ui/Menu';

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
    error,
    errorMessage,
    filter,
    hideFiltered,
    id,
    label,
    name,
    onChange,
    required,
    showInlineError,
    transform,
    value,
    ...props
}) => (
    <FormControl component="fieldset" disabled={disabled} error={!!error} required={required}>
        {label && <FormLabel component="legend">{label}</FormLabel>}
        <FormGroup id={id} name={name}>
            {(hideFiltered && filter ? allowedValues.filter(filter) : allowedValues).map(item =>
                <FormControlLabel
                    control={<Checkbox
                        checked={value.includes(item)}
                        onChange={() => onChange(xor(item, value))}
                        value={item}
                        {...filterDOMProps(props)}
                    />}
                    disabled={disabled || (filter && !filter(item))}
                    key={item}
                    label={transform ? transform(item) : item}
                    value={'' + item}
                />
            )}
        </FormGroup>
        {error && showInlineError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
);

const renderSelect = ({
    allowedValues,
    disabled,
    displayEmpty,
    error,
    errorMessage,
    filter,
    id,
    label,
    MenuProps,
    multiple,
    onChange,
    renderValue,
    required,
    showInlineError,
    transform,
    value,
    ...props
}) => (
    <FormControl disabled={disabled} error={!!error} required={required}>
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
        <Select
            displayEmpty={displayEmpty}
            input={<Input id={id} {...filterDOMProps(props)} />}
            MenuProps={MenuProps}
            multiple={multiple}
            onChange={event => onChange(event.target.value)}
            renderValue={renderValue}
            value={value}
        >
            {(filter ? filter.filter(filter) : allowedValues).map(item =>
                <MenuItem key={item} value={item}>{transform ? transform(item) : item}</MenuItem>
            )}
        </Select>
        {error && showInlineError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
);

const Select_ = ({checkboxes, ...props}) => checkboxes ? renderCheckboxes(props) : renderSelect(props);

Select_.propTypes = {
    filter: PropTypes.func,
    hideFiltered:   PropTypes.bool
};

export default connectField(Select_);
