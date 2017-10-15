import Checkbox                                        from 'material-ui/Checkbox';
import connectField                                    from 'uniforms/connectField';
import filterDOMProps                                  from 'uniforms/filterDOMProps';
import PropTypes                                       from 'prop-types';
import React                                           from 'react';
import Switch                                          from 'material-ui/Switch';
import {FormControl, FormControlLabel, FormHelperText} from 'material-ui/Form';

const Bool = ({
    appearance,
    disabled,
    error,
    errorMessage,
    label,
    onChange,
    required,
    showInlineError,
    value,
    ...props
}) => (
    <FormControl disabled={disabled} error={!!error} required={required}>
        <FormControlLabel
            control={appearance === 'toggle' ? (
                <Switch
                    checked={!!value}
                    onChange={(event, value) => disabled || onChange(value)}
                    {...filterDOMProps(props)}
                />
            ) : (
                <Checkbox
                    checked={!!value}
                    onChange={(event, value) => disabled || onChange(value)}
                    {...filterDOMProps(props)}
                />
            )}
            label={label}
        />
        {error && showInlineError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
);

Bool.defaultProps = {appearance: 'checkbox'};

Bool.propTypes = {
    appearance: PropTypes.oneOf(['toggle', 'checkbox'])
};

export default connectField(Bool);
