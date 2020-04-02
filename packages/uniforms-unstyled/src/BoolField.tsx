import React, { HTMLProps, Ref } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

export type BoolFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    disabled: boolean;
    id: string;
    inputRef?: Ref<HTMLInputElement>;
    label: string;
    name: string;
    onChange: (value?: boolean) => void;
    value?: boolean;
  }
>;

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
