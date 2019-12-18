import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';

const Error = ({
  children,
  error,
  errorMessage,
  fullWidth,
  margin,
  variant,
  ...props
}) =>
  !error ? null : (
    <FormControl
      error={!!error}
      fullWidth={!!fullWidth}
      margin={margin}
      variant={variant}
    >
      <FormHelperText {...filterDOMProps(props)}>
        {children || errorMessage}
      </FormHelperText>
    </FormControl>
  );

Error.defaultProps = {
  fullWidth: true,
  margin: 'dense',
};

export default connectField(Error, { initialValue: false });
