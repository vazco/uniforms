import FormControl from '@mui/material/FormControl';
import FormHelperText, {
  FormHelperTextProps,
} from '@mui/material/FormHelperText';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { Override, connectField, filterDOMProps } from 'uniforms';

export type ErrorFieldProps = Override<
  FormHelperTextProps,
  {
    errorMessage?: string;
    fullWidth?: boolean;
    margin?: 'dense' | 'normal' | 'none';
  }
>;

function Error({
  children,
  error,
  errorMessage,
  fullWidth,
  margin,
  variant,
  ...props
}: ErrorFieldProps) {
  const theme = useTheme();
  const themeProps = theme.components?.MuiFormControl?.defaultProps;

  return !error ? null : (
    <FormControl
      error={!!error}
      fullWidth={fullWidth ?? themeProps?.fullWidth ?? true}
      margin={margin ?? themeProps?.margin ?? 'dense'}
      variant={variant ?? themeProps?.variant}
    >
      <FormHelperText {...filterDOMProps(props)}>
        {children || errorMessage}
      </FormHelperText>
    </FormControl>
  );
}

export default connectField<ErrorFieldProps>(Error, {
  initialValue: false,
  kind: 'leaf',
});
