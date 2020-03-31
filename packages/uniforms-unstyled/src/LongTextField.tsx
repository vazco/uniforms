import React, { HTMLProps, Ref } from 'react';
import { connectField, filterDOMProps } from 'uniforms';

export type LongTextFieldProps = {
  disabled: boolean;
  id: string;
  inputRef?: Ref<HTMLTextAreaElement>;
  label: string;
  name: string;
  onChange: (value?: string) => void;
  placeholder: string;
  type?: string;
  value?: string;
} & HTMLProps<HTMLDivElement>;

const LongText = ({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  value,
  ...props
}: LongTextFieldProps) => (
  <div {...filterDOMProps(props)}>
    {label && <label htmlFor={id}>{label}</label>}

    <textarea
      disabled={disabled}
      id={id}
      name={name}
      onChange={event => onChange(event.target.value)}
      placeholder={placeholder}
      ref={inputRef}
      value={value ?? ''}
    />
  </div>
);

export default connectField(LongText);
