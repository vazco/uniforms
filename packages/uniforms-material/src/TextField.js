import connectField     from 'uniforms/connectField';
import filterDOMProps   from 'uniforms/filterDOMProps';
import React            from 'react';
import TextField        from 'material-ui/TextField';

import wrapField from './wrapField';

const Text = props => wrapField(props, (
    <TextField
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        error={!!props.error}
        FormHelperTextProps={props.FormHelperTextProps}
        fullWidth={props.fullWidth}
        helperText={props.error && props.showInlineError ? props.errorMessage : props.helperText}
        helperTextClassName={props.helperTextClassName}
        InputProps={props.InputProps}
        inputProps={{...props.inputProps, id: props.id}}
        inputRef={props.inputRef}
        label={props.label}
        margin={props.margin}
        onChange={event => props.onChange(event.target.value)}
        placeholder={props.placeholder}
        value={props.value}
        {...filterDOMProps(props)}
    />
));

Text.defaultProps = {
    fullWidth: true
};

export default connectField(Text);
