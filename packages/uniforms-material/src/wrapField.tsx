import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import omit from 'lodash/omit';
import React, { ReactNode, createElement } from 'react';

const _filterDOMPropsList = ['fullWidth', 'helperText', 'margin', 'variant'];
const _filterDOMProps = (props: Record<string, any>) =>
  omit(props, _filterDOMPropsList);

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
  ...children: ReactNode[]
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

  return createElement(
    FormControl,
    props,
    ...children,
    !!formHelperText && <FormHelperText>{formHelperText}</FormHelperText>,
  );
}

export default Object.assign(wrap, { _filterDOMProps, _filterDOMPropsList });
