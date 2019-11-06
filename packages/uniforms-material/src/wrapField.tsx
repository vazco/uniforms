import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import omit from 'lodash/omit';

const _filterDOMPropsList = ['fullWidth', 'helperText', 'margin', 'variant'];
const _filterDOMProps = props => omit(props, _filterDOMPropsList);

function wrap(
  {
    component,
    disabled,
    error,
    errorMessage,
    fullWidth,
    helperText,
    margin,
    required,
    showInlineError,
    variant,
  }: any,
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
    variant,
  };

  return React.createElement(
    FormControl,
    props,
    ...children,
    !!formHelperText && <FormHelperText>{formHelperText}</FormHelperText>,
  );
}

export default Object.assign(wrap, { _filterDOMProps, _filterDOMPropsList });
