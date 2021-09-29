import { PropTypes } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText, {
  FormHelperTextProps,
} from '@material-ui/core/FormHelperText';
import useTheme from '@material-ui/core/styles/useTheme';
import React from 'react';
import { Override, connectField, filterDOMProps } from 'uniforms';

export type ErrorFieldProps = Override<
  FormHelperTextProps,
  { errorMessage?: string; fullWidth?: boolean; margin?: PropTypes.Margin }
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
  const themeProps = theme.props?.MuiFormControl;

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
