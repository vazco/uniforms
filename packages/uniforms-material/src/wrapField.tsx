import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import omit from 'lodash/omit';
import React, { ReactNode, createElement } from 'react';

const filteredProps = [
  'checkboxes',
  'disableItem',
  'fullWidth',
  'helperText',
  'margin',
  'variant',
] as const;

function __filterProps<T extends object>(props: T) {
  return omit(props, filteredProps) as Omit<T, typeof filteredProps[number]>;
}

function wrapField(
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

export default Object.assign(wrapField, { __filterProps });
