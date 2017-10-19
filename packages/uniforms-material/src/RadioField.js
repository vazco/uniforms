import connectField       from 'uniforms/connectField';
import filterDOMProps     from 'uniforms/filterDOMProps';
import PropTypes          from 'prop-types';
import Radio              from 'material-ui/Radio';
import React              from 'react';
import {FormControlLabel} from 'material-ui/Form';
import {FormControl}      from 'material-ui/Form';
import {FormHelperText}   from 'material-ui/Form';
import {FormLabel}        from 'material-ui/Form';
import {RadioGroup}       from 'material-ui/Radio';

import wrapField from './wrapField';

const Radio_ = props => wrapField(props, (
    <FormControl
        component="fieldset"
        disabled={props.disabled}
        error={!!props.error}
        fullWidth={props.fullWidth}
        margin={props.margin}
        required={props.required}
    >
        {props.label && <FormLabel component="legend">{props.label}</FormLabel>}
        <RadioGroup
            aria-label={props.name}
            name={props.name}
            onChange={(event, value) => props.onChange(value)}
            value={'' + props.value}
            {...filterDOMProps(props)}
        >
            {(props.hideFiltered && props.filter
                ? props.allowedValues.filter(props.filter)
                : props.allowedValues
            ).map(item =>
                <FormControlLabel
                    control={<Radio />}
                    disabled={props.disabled || (props.filter && !props.filter(item))}
                    key={item}
                    label={props.transform ? props.transform(item) : item}
                    value={'' + item}
                />
            )}
        </RadioGroup>
        {props.error && props.showInlineError && <FormHelperText>{props.errorMessage}</FormHelperText>}
    </FormControl>
));

Radio_.defaultProps = {
    fullWidth: true,
    margin: 'normal'
};

Radio_.propTypes = {
    filter: PropTypes.func,
    hideFiltered: PropTypes.bool
};

export default connectField(Radio_);
