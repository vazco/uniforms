import FormControl      from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText   from '@material-ui/core/FormHelperText';
import FormLabel        from '@material-ui/core/FormLabel';
import RadioMaterial    from '@material-ui/core/Radio';
import RadioGroup       from '@material-ui/core/RadioGroup';
import React            from 'react';
import connectField     from 'uniforms/connectField';
import filterDOMProps   from 'uniforms/filterDOMProps';

const Radio = ({
    allowedValues,
    checkboxes, // eslint-disable-line no-unused-vars
    disabled,
    error,
    errorMessage,
    fullWidth,
    helperText,
    id,
    inputRef,
    label,
    margin,
    name,
    onChange,
    required,
    showInlineError,
    transform,
    value,
    ...props
}) => (
    <FormControl
        component="fieldset"
        disabled={!!disabled}
        error={!!error}
        fullWidth={!!fullWidth}
        margin={margin}
        required={required}
    >
        {label && <FormLabel component="legend" htmlFor={name}>{label}</FormLabel>}
        <RadioGroup
            id={id}
            name={name}
            onChange={event => disabled || onChange(event.target.value)}
            ref={inputRef}
            value={value}
        >
            {allowedValues.map(item => (
                <FormControlLabel
                    control={<RadioMaterial {...filterDOMProps(props)} />}
                    key={item}
                    label={transform ? transform(item) : item}
                    value={`${item}`}
                />
            ))}
            {showInlineError && error ? (
                <FormHelperText>{errorMessage}</FormHelperText>
            ) : (
                helperText && <FormHelperText>{helperText}</FormHelperText>
            )}
        </RadioGroup>
    </FormControl>
);


Radio.defaultProps = {
    fullWidth: true,
    margin: 'normal'
};

export default connectField(Radio);
