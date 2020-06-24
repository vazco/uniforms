import React, { HTMLProps, ReactNode, Ref } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

export type TextFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    disabled: boolean;
    id: string;
    inputRef?: Ref<HTMLInputElement>;
    label?: ReactNode;
    name: string;
    onChange(value?: string): void;
    placeholder: string;
    type?: string;
    value?: string;
  }
>;

function Text({
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
}: TextFieldProps) {
  return (
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
}

Text.defaultProps = { type: 'text' };

export default connectField(Text, { kind: 'leaf' });
