import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';

export default function wrapField(
  {component, disabled, error, errorMessage, fullWidth, helperText, margin, required, showInlineError, variant},
  children
) {
  return (
    <FormControl
      component={component}
      disabled={!!disabled}
      error={!!error}
      fullWidth={!!fullWidth}
      margin={margin}
      required={required}
      variant={variant}
    >
      {children}
      {showInlineError && error ? (
        <FormHelperText>{errorMessage}</FormHelperText>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
