import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import { filterDOMProps, useField } from 'uniforms';

const ErrorsField = ({
  children,
  fullWidth,
  margin,
  variant,
  ...props
}: any) => {
  const { error, schema } = useField(props.name, props)[1];

  return !error && !children ? null : (
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
};

ErrorsField.defaultProps = {
  fullWidth: true,
  margin: 'dense',
};

export default ErrorsField;
