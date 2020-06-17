import FormControl from '@material-ui/core/FormControl';
import FormHelperText, {
  FormHelperTextProps,
} from '@material-ui/core/FormHelperText';
import React from 'react';
import { filterDOMProps, Override, useForm } from 'uniforms';

export type ErrorsFieldProps = Override<
  FormHelperTextProps,
  {
    fullWidth?: boolean;
    margin?: 'none' | 'dense' | 'normal';
    variant?: 'standard' | 'outlined' | 'filled';
  }
>;

function ErrorsField({
  children,
  fullWidth = true,
  margin = 'dense',
  variant,
  ...props
}: ErrorsFieldProps) {
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
}

export default ErrorsField;
