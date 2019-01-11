import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import omit from 'lodash/omit';

export default function wrapField(
  {component, disabled, error, errorMessage, fullWidth, helperText, margin, required, showInlineError, variant},
  ...children
) {
  const formHelperText = showInlineError && error ? errorMessage : helperText;
  const props = {
    component,
    disabled: !!disabled,
    error: !!error,
    fullWidth: !!fullWidth,
    margin,
    required,
    variant
  };

  return React.createElement(
    FormControl,
    props,
    ...children,
    !!formHelperText && <FormHelperText>{formHelperText}</FormHelperText>
  );
}

wrapField.filterDOMPropsList = ['fullWidth', 'helperText', 'margin', 'variant'];
wrapField.filterDOMProps = props => omit(props, wrapField.filterDOMPropsList);
