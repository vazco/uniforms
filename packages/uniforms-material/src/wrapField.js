import Grid             from 'material-ui/Grid';
import React            from 'react';

export const wrapField = (props, children) => (
    <Grid item>
        {children}
    </Grid>
);

export default wrapField;
