import connectField     from 'uniforms/connectField';
import filterDOMProps   from 'uniforms/filterDOMProps';
import injectName       from 'uniforms/injectName';
import joinName         from 'uniforms/joinName';
import React            from 'react';
import {FormControl}    from 'material-ui/Form';
import {FormHelperText} from 'material-ui/Form';
import {FormLabel}      from 'material-ui/Form';

import AutoField from './AutoField';

const Nest = ({
    children,
    disabled,
    error,
    errorMessage,
    fields,
    fullWidth,
    itemProps,
    label,
    margin,
    name,
    required,
    showInlineError,
    ...props
}) =>
    <FormControl
        disabled={disabled}
        error={!!error}
        fullWidth={fullWidth}
        margin={margin}
        required={required}
        {...filterDOMProps(props)}
    >
        {label && <FormLabel component="legend">{label}</FormLabel>}
        {children ? (
            injectName(name, children)
        ) : (
            fields.map(key =>
                <AutoField key={key} name={joinName(name, key)} {...itemProps} />
            )
        )}
        {error && showInlineError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
;

Nest.defaultProps = {
    fullWidth: true,
    margin: 'normal'
};

export default connectField(Nest, {includeInChain: false});
