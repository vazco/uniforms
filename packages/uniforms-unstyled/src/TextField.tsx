import React, { HTMLProps, Ref } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

export type TextFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    disabled: boolean;
    id: string;
    inputRef?: Ref<HTMLInputElement>;
    label: string;
    name: string;
    onChange: (value?: string) => void;
    placeholder: string;
    type?: string;
    value?: string;
  }
>;

const Text = ({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
  ...props
}: TextFieldProps) => (
  <div {...filterDOMProps(props)}>
    {label && <label htmlFor={id}>{label}</label>}

    <input
      disabled={disabled}
      id={id}
      name={name}
      onChange={event => onChange(event.target.value)}
      placeholder={placeholder}
      ref={inputRef}
      type={type}
      value={value ?? ''}
    />
  </div>
);

Text.defaultProps = { type: 'text' };

export default connectField<TextFieldProps>(Text);
