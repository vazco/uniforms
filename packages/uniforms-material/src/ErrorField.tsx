import { PropTypes, useTheme } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText, {
  FormHelperTextProps,
} from '@material-ui/core/FormHelperText';
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
  fullWidth = true,
  margin = 'dense',
  variant,
  ...props
}: ErrorFieldProps) {
  const theme = useTheme();
  const themeProps = theme.props?.MuiFormControl;

  return !error ? null : (
    <FormControl
      error={!!error}
      fullWidth={themeProps?.fullWidth ?? !!fullWidth}
      margin={themeProps?.margin ?? margin}
      variant={themeProps?.variant ?? variant}
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
