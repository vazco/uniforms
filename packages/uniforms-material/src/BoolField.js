import Checkbox                                        from 'material-ui/Checkbox';
import connectField                                    from 'uniforms/connectField';
import filterDOMProps                                  from 'uniforms/filterDOMProps';
import React                                           from 'react';
import Switch                                          from 'material-ui/Switch';
import {FormControl, FormControlLabel, FormHelperText} from 'material-ui/Form';

const Bool = ({appearance, error, disabled, label, onChange, required, value, ...props}) => (
    <FormControl error={!!error} required={required}>
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
        {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
);

Bool.defaultProps = {appearance: 'checkbox'};

export default connectField(Bool);
