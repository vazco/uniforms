import Checkbox           from 'material-ui/Checkbox';
import connectField       from 'uniforms/connectField';
import filterDOMProps     from 'uniforms/filterDOMProps';
import PropTypes          from 'prop-types';
import React              from 'react';
import Switch             from 'material-ui/Switch';
import {FormControlLabel} from 'material-ui/Form';
import {FormControl}      from 'material-ui/Form';
import {FormHelperText}   from 'material-ui/Form';

import wrapField from './wrapField';

const Bool = props => wrapField(props, (
    <FormControl
        disabled={props.disabled}
        error={!!props.error}
        fullWidth={props.fullWidth}
        margin={props.margin}
        required={props.required}
    >
        <FormControlLabel
            checked={!!props.value}
            control={props.appearance === 'toggle' ? (
                <Switch
                    checkedClassName={props.checkedClassName}
                    checkedIcon={props.checkedIcon}
                    disableRipple={props.disableRipple}
                    disabledClassName={props.disabledClassName}
                    icon={props.icon}
                    inputProps={{...props.inputProps, id: props.id}}
                    inputRef={props.inputRef}
                    name={props.name}
                    {...filterDOMProps(props)}
                />
            ) : (
                <Checkbox
                    checkedClassName={props.checkedClassName}
                    checkedIcon={props.checkedIcon}
                    disableRipple={props.disableRipple}
                    disabledClassName={props.disabledClassName}
                    icon={props.icon}
                    indeterminate={props.indeterminate}
                    indeterminateIcon={props.indeterminateIcon}
                    inputProps={{...props.inputProps, id: props.id}}
                    inputRef={props.inputRef}
                    name={props.name}
                    {...filterDOMProps(props)}
                />
            )}
            onChange={(event, value) => props.disabled || props.onChange(value)}
            disabled={props.disabled}
            label={props.label}
        />
        {props.error && props.showInlineError && <FormHelperText>{props.errorMessage}</FormHelperText>}
    </FormControl>
));

Bool.defaultProps = {
    appearance: 'checkbox',
    fullWidth: true
};

Bool.propTypes = {
    appearance: PropTypes.oneOf(['toggle', 'checkbox'])
};

export default connectField(Bool);
