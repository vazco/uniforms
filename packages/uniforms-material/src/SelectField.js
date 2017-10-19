import Checkbox           from 'material-ui/Checkbox';
import connectField       from 'uniforms/connectField';
import filterDOMProps     from 'uniforms/filterDOMProps';
import PropTypes          from 'prop-types';
import React              from 'react';
import TextField          from 'material-ui/TextField';
import {FormControlLabel} from 'material-ui/Form';
import {FormControl}      from 'material-ui/Form';
import {FormGroup}        from 'material-ui/Form';
import {FormHelperText}   from 'material-ui/Form';
import {FormLabel}        from 'material-ui/Form';
import {MenuItem}         from 'material-ui/Menu';

import wrapField from './wrapField';

const xor = (item, array) => {
    const index = array.indexOf(item);
    if (index === -1) {
        return array.concat([item]);
    }

    return array.slice(0, index).concat(array.slice(index + 1));
};

const renderCheckboxes = props => (
    <FormControl
        component="fieldset"
        disabled={props.disabled}
        error={!!props.error}
        fullWidth={props.fullWidth}
        margin={props.margin}
        required={props.required}
    >
        {props.label && <FormLabel component="legend">{props.label}</FormLabel>}
        <FormGroup id={props.id} name={props.name}>
            {(props.hideFiltered && props.filter
                ? props.allowedValues.filter(props.filter)
                : props.allowedValues
            ).map(item =>
                <FormControlLabel
                    control={<Checkbox
                        checked={props.value.includes(item)}
                        onChange={() => props.onChange(xor(item, props.value))}
                        value={item}
                        {...filterDOMProps(props)}
                    />}
                    disabled={props.disabled || (props.filter && !props.filter(item))}
                    key={item}
                    label={props.transform ? props.transform(item) : item}
                    value={'' + item}
                />
            )}
        </FormGroup>
        {props.error && props.showInlineError && <FormHelperText>{props.errorMessage}</FormHelperText>}
    </FormControl>
);

const renderSelect = props => (
    <TextField
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        error={!!props.error}
        FormHelperTextProps={props.FormHelperTextProps}
        fullWidth={props.fullWidth}
        helperText={props.error && props.showInlineError ? props.errorMessage : props.helperText}
        helperTextClassName={props.helperTextClassName}
        InputLabelProps={{htmlFor: props.id}}
        InputProps={props.InputProps}
        inputProps={{...props.inputProps, id: props.id}}
        inputRef={props.inputRef}
        label={props.label}
        margin={props.margin}
        onChange={event => props.onChange(event.target.value)}
        placeholder={props.placeholder}
        select
        SelectProps={{
            autoWidth: props.autoWidth,
            displayEmpty: props.displayEmpty,
            MenuProps: props.MenuProps,
            multiple: props.multiple,
            native: props.native,
            renderValue: props.renderValue
        }}
        value={props.value}
        {...filterDOMProps(props)}
    >
        {(props.filter ? props.allowedValues.filter(props.filter) : props.allowedValues).map(item =>
            <MenuItem key={item} value={item}>{props.transform ? props.transform(item) : item}</MenuItem>
        )}
    </TextField>
);

const Select_ = ({checkboxes, ...props}) => wrapField(
    props,
    checkboxes ? renderCheckboxes(props) : renderSelect(props)
);

Select_.defaultProps = {
    fullWidth: true,
    margin: 'normal'
};

Select_.propTypes = {
    filter: PropTypes.func,
    hideFiltered:   PropTypes.bool
};

export default connectField(Select_);
