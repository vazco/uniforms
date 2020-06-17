import FormControl from '@material-ui/core/FormControl';
import FormHelperText, {
  FormHelperTextProps,
} from '@material-ui/core/FormHelperText';
import React from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

export type ErrorFieldProps = Override<
  FormHelperTextProps,
  {
    errorMessage?: string;
    fullWidth?: boolean;
    margin?: string;
  }
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
  return !error ? null : (
    <FormControl
      error={!!error}
      fullWidth={!!fullWidth}
      margin={margin === 'dense' ? margin : undefined}
      variant={variant}
    >
      <FormHelperText {...filterDOMProps(props)}>
        {children || errorMessage}
      </FormHelperText>
    </FormControl>
  );
}

export default connectField(Error, { initialValue: false, kind: 'leaf' });
