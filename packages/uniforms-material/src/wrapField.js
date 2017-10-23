import filterDOMProps   from 'uniforms/filterDOMProps';
import Grid             from 'material-ui/Grid';
import React            from 'react';

export const wrapField = (props, children) => (
    <Grid item {...props.gridProps}>
        {children}
    </Grid>
);

export default wrapField;

filterDOMProps.register(
    'appearance',
    'checkboxes',
    'fullWidth',
    'gridProps',
    'margin'
);
