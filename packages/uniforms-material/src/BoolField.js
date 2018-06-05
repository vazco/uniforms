import Checkbox         from '@material-ui/core/Checkbox';
import FormControl      from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup        from '@material-ui/core/FormGroup';
import FormHelperText   from '@material-ui/core/FormHelperText';
import FormLabel        from '@material-ui/core/FormLabel';
import PropTypes        from 'prop-types';
import React            from 'react';
import Switch           from '@material-ui/core/Switch';
import connectField     from 'uniforms/connectField';
import filterDOMProps   from 'uniforms/filterDOMProps';

const Bool = ({
    appearance,
    disabled,
    error,
    errorMessage,
    fullWidth,
    helperText,
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
    const SelectionControl = appearance === 'checkbox' ? Checkbox : Switch;

    return (
        <FormControl
            component="fieldset"
            disabled={!!disabled}
            error={!!error}
            fullWidth={!!fullWidth}
            margin={margin}
            required={required}
        >
            {legend && <FormLabel component="legend" htmlFor={name}>{legend}</FormLabel>}
            <FormGroup>
                <FormControlLabel
                    control={<SelectionControl
                        checked={!!value}
                        name={name}
                        onChange={event => disabled || onChange(event.target.checked)}
                        ref={inputRef}
                        value={name}
                        {...filterDOMProps(props)}
                    />}
                    label={transform ? transform(label) : label}
                />
            </FormGroup>
            {showInlineError && error ? (
                <FormHelperText>{errorMessage}</FormHelperText>
            ) : (
                helperText && <FormHelperText>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};

Bool.defaultProps = {
    appearance: 'checkbox',
    fullWidth: true,
    margin: 'normal'
};

Bool.propTypes = {
    appearance: PropTypes.oneOf(['toggle', 'checkbox'])
};

export default connectField(Bool);
