import { useTheme } from '@mui/material';
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
  fullWidth,
  margin,
  variant,
  ...props
}: ErrorsFieldProps) {
  const theme = useTheme();
  const themeProps = theme.components?.MuiFormControl?.defaultProps;
  const { error, schema } = useForm();

  return !error && !children ? null : (
    <FormControl
      error={!!error}
      fullWidth={fullWidth ?? themeProps?.fullWidth ?? true}
      margin={margin ?? themeProps?.margin ?? 'dense'}
      variant={variant ?? themeProps?.variant}
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
