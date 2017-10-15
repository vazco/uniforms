import connectField                                               from 'uniforms/connectField';
import filterDOMProps                                             from 'uniforms/filterDOMProps';
import PropTypes                                                  from 'prop-types';
import Radio, {RadioGroup}                                        from 'material-ui/Radio';
import React                                                      from 'react';
import {FormLabel, FormControl, FormControlLabel, FormHelperText} from 'material-ui/Form';

const Radio_ = ({
    allowedValues,
    checkboxes, // eslint-disable-line no-unused-vars
    disabled,
    error,
    errorMessage,
    filter,
    hideFiltered,
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
        <RadioGroup
            aria-label={name}
            name={name}
            onChange={(event, value) => onChange(value)}
            value={'' + value}
            {...filterDOMProps(props)}
        >
            {(hideFiltered && filter ? allowedValues.filter(filter) : allowedValues).map(item =>
                <FormControlLabel
                    control={<Radio />}
                    disabled={disabled || (filter && !filter(item))}
                    key={item}
                    label={transform ? transform(item) : item}
                    value={'' + item}
                />
            )}
        </RadioGroup>
        {error && showInlineError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
);

Radio_.propTypes = {
    filter: PropTypes.func,
    hideFiltered:   PropTypes.bool
};

export default connectField(Radio_);
