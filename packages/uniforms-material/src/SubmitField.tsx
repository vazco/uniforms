import Button from '@material-ui/core/Button';
import React, { HTMLProps, Ref } from 'react';
import { filterDOMProps, useForm } from 'uniforms';
import { OverrideProps } from '@material-ui/core/OverridableComponent';
import { ExtendButtonBaseTypeMap } from '@material-ui/core/ButtonBase/ButtonBase';

type SubmitFieldProps = {
  disabled?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  value?: string;
  name: string;
} & HTMLProps<HTMLInputElement> & { href: string } & OverrideProps<
    ExtendButtonBaseTypeMap<any>,
    'a'
  >;

const SubmitField = ({
  children,
  disabled,
  inputRef,
  label,
  value,
  name,
  ...props
}: SubmitFieldProps) => {
  const { error, state } = useForm();

  return (
    <Button
      disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
      ref={inputRef}
      type="submit"
      value={value}
      {...filterDOMProps(props)}
    >
      {children || label}
    </Button>
  );
};

SubmitField.defaultProps = { label: 'Submit', variant: 'contained' };

export default SubmitField;
