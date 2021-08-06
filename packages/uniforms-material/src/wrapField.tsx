import { useTheme } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React, { ReactNode, createElement } from 'react';

export default function wrapField(
  {
    component,
    disabled,
    error,
    errorMessage,
    fullWidth,
    helperText,
    margin,
    readOnly,
    required,
    showInlineError,
    variant,
  }: any,
  ...children: ReactNode[]
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();
  const formHelperText = showInlineError && error ? errorMessage : helperText;
  const materialProps = theme.props?.MuiFormControl;
  const props = {
    component,
    disabled: !!disabled,
    error: !!error,
    fullWidth: materialProps?.fullWidth ?? !!fullWidth,
    margin: materialProps?.margin ?? margin,
    readOnly,
    required,
    variant: materialProps?.variant ?? variant,
  };

  return createElement(
    FormControl,
    props,
    ...children,
    !!formHelperText && <FormHelperText>{formHelperText}</FormHelperText>,
  );
}
