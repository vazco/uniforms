import React, { HTMLProps, Ref } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

export type NumFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    decimal?: boolean;
    disabled: boolean;
    id: string;
    inputRef?: Ref<HTMLInputElement>;
    label: string;
    max?: number;
    min?: number;
    name: string;
    onChange(value?: number): void;
    placeholder: string;
    step?: number;
    value?: number;
  }
>;

function Num({
  decimal,
  disabled,
  id,
  inputRef,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  step,
  value,
  ...props
}: NumFieldProps) {
  return (
    <div {...filterDOMProps(props)}>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        disabled={disabled}
        id={id}
        max={max}
        min={min}
        name={name}
        onChange={event => {
          const parse = decimal ? parseFloat : parseInt;
          const value = parse(event.target.value);
          onChange(isNaN(value) ? undefined : value);
        }}
        placeholder={placeholder}
        ref={inputRef}
        step={step || (decimal ? 0.01 : 1)}
        type="number"
        value={value ?? ''}
      />
    </div>
  );
}

export default connectField(Num, { kind: 'leaf' });
