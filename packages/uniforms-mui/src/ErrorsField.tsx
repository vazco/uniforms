import FormControl from '@mui/material/FormControl';
import FormHelperText, {
  FormHelperTextProps,
} from '@mui/material/FormHelperText';
import React from 'react';
import { Override, filterDOMProps, useForm } from 'uniforms';

export type ErrorsFieldProps = Override<
  FormHelperTextProps,
  {
    fullWidth?: boolean;
    margin?: 'dense' | 'normal' | 'none';
    variant?: 'standard' | 'outlined' | 'filled';
  }
>;

function ErrorsField({
  children,
  fullWidth = true,
  margin,
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
