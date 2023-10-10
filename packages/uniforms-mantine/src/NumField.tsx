import { Input, NumberInput, NumberInputProps } from '@mantine/core';
import React, { ReactNode, Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import HelpTooltip from '/client/components/HelpTooltip';

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
      disabled={disabled}
      label={
        tooltip ? (
          <>
            <Input.Label required={required}>{label}</Input.Label>
            {tooltip && <HelpTooltip label={tooltip} />}
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
      type="number"
      value={value ?? ''}
      required={tooltip ? false : required}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<NumFieldProps>(Num, { kind: 'leaf' });
