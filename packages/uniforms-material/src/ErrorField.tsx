import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import FormHelperText, {
  FormHelperTextProps,
} from '@material-ui/core/FormHelperText';
import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';

type ErrorFieldProps = {
  errorMessage?: string;
  margin: string;
} & Omit<FormControlProps, 'margin'> &
  Omit<FormHelperTextProps, 'margin'>;

const Error = ({
  children,
  error,
  errorMessage,
  fullWidth,
  margin,
  variant,
  ...props
}: ErrorFieldProps) =>
  !error ? null : (
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

Error.defaultProps = {
  fullWidth: true,
  margin: 'dense',
};

export default connectField<ErrorFieldProps>(Error, { initialValue: false });
