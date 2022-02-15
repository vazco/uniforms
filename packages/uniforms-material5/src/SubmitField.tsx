import { useTheme } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import React, { ReactNode, Ref } from 'react';
import { Override, filterDOMProps, useForm } from 'uniforms';

export type SubmitFieldProps = Override<
  ButtonProps,
  // FIXME: What kind of `ref` is it?
  { inputRef?: Ref<any>; label?: ReactNode }
>;

function SubmitField({
  children,
  disabled,
  inputRef,
  label = 'Submit',
  value,
  ...props
}: SubmitFieldProps) {
  const { error, state } = useForm();
  const theme = useTheme();
  const themeProps = theme.components?.MuiButton?.defaultProps;

  return (
    <Button
      disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
      ref={inputRef}
      type="submit"
      value={value}
      variant={themeProps?.variant ?? 'contained'}
      {...filterDOMProps(props)}
    >
      {children || label}
    </Button>
  );
}

export default SubmitField;
