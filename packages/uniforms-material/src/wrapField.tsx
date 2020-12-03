import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React, { ReactNode, createElement } from 'react';
import { filterDOMProps } from 'uniforms';

export default function wrap(
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
  const formHelperText = showInlineError && error ? errorMessage : helperText;
  const props = {
    component,
    disabled: !!disabled,
    error: !!error,
    fullWidth: !!fullWidth,
    margin,
    readOnly: !!readOnly,
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

declare module 'uniforms' {
  interface FilterDOMProps {
    checkboxes: never;
    disableItem: never;
    fullWidth: never;
    helperText: never;
    margin: never;
    variant: never;
  }
}

filterDOMProps.register(
  'checkboxes',
  'disableItem',
  'fullWidth',
  'helperText',
  'margin',
  'variant',
);
