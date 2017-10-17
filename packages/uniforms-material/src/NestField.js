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
    error,
    errorMessage,
    fields,
    itemProps,
    label,
    name,
    showInlineError,
    ...props
}) =>
    <FormControl {...filterDOMProps(props)} error={!!error}>
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

export default connectField(Nest, {includeInChain: false});
