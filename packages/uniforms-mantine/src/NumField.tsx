import { Input, NumberInput, NumberInputProps, Tooltip } from '@mantine/core';
import React, { ReactNode, Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

export type NumFieldProps = FieldProps<
  number,
  NumberInputProps,
  { decimal?: boolean; inputRef?: Ref<HTMLInputElement>; tooltip?: ReactNode }
>;

function Num({
  decimal,
  disabled,
  inputRef,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  readOnly,
  step,
  value,
  tooltip,
  required,
  ...props
}: NumFieldProps) {
  return (
    <NumberInput
      mb="xs"
      disabled={disabled}
      label={
        tooltip ? (
          <>
            <Input.Label required={required}>{label}</Input.Label>
            {tooltip && <Tooltip label={tooltip}>{tooltip}</Tooltip>}
          </>
        ) : (
          label
        )
      }
      max={max}
      min={min}
      name={name}
      onChange={newValue => {
        const parse = decimal ? parseFloat : parseInt;
        const value = typeof newValue === 'string' ? parse(newValue) : newValue;
        onChange(isNaN(value) ? undefined : value);
      }}
      placeholder={placeholder}
      readOnly={readOnly}
      ref={inputRef}
      step={step || (decimal ? 0.01 : 1)}
      value={value ?? ''}
      required={tooltip ? false : required}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<NumFieldProps>(Num, { kind: 'leaf' });
