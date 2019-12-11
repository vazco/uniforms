import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import { BaseField, filterDOMProps, nothing } from 'uniforms';

const ErrorsField = (
  { children, fullWidth, margin, variant, ...props }: any,
  { uniforms: { error, schema } },
) =>
  !error && !children ? (
    nothing
  ) : (
    <FormControl
      error={!!error}
      fullWidth={!!fullWidth}
      margin={margin}
      variant={variant}
    >
      {!!children && (
        <FormHelperText {...filterDOMProps(props)}>{children}</FormHelperText>
      )}
      {schema.getErrorMessages(error).map((message, index) => (
        <FormHelperText key={index} {...filterDOMProps(props)}>
          {message}
        </FormHelperText>
      ))}
    </FormControl>
  );

ErrorsField.contextTypes = BaseField.contextTypes;
ErrorsField.defaultProps = {
  fullWidth: true,
  margin: 'dense',
};

export default ErrorsField;
