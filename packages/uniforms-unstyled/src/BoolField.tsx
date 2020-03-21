import React, { HTMLProps, Ref } from 'react';
import { connectField, filterDOMProps } from 'uniforms';

type BoolFieldProps = {
  disabled: boolean;
  id: string;
  inputRef?: Ref<HTMLInputElement>;
  label: string;
  name: string;
  onChange: (value?: boolean) => void;
  value?: boolean;
} & Omit<HTMLProps<HTMLDivElement>, 'value'>;

const Bool = ({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  value,
  ...props
}: BoolFieldProps) => (
  <div {...filterDOMProps(props)}>
    <input
      checked={value || false}
      disabled={disabled}
      id={id}
      name={name}
      onChange={
        disabled
          ? undefined
          : () => {
              onChange(!value);
            }
      }
      ref={inputRef}
      type="checkbox"
    />

    {label && <label htmlFor={id}>{label}</label>}
  </div>
);

export default connectField(Bool);
