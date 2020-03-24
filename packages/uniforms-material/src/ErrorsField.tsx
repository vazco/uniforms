import FormControl from '@material-ui/core/FormControl';
import FormHelperText, {
  FormHelperTextProps,
} from '@material-ui/core/FormHelperText';
import React from 'react';
import { filterDOMProps, useForm } from 'uniforms';

type ErrorsFieldProps = {
  fullWidth?: boolean;
  margin?: 'none' | 'dense' | 'normal';
  variant?: 'standard' | 'outlined' | 'filled';
  name: string;
} & FormHelperTextProps;

const ErrorsField = ({
  children,
  fullWidth,
  margin,
  variant,
  name,
  ...props
}: ErrorsFieldProps) => {
  const { error, schema } = useForm();

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
