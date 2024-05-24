import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';
import { Radio as MantineRadio, RadioProps, Text, Stack } from '@mantine/core';

import type { Option } from './types';

export type RadioFieldProps = FieldProps<
  string,
  RadioProps,
  {
    options?: Option<string>[];
    checkboxes?: boolean;
  }
>;

function Radio({
  options,
  id,
  label,
  name,
  onChange,
  readOnly,
  value,
  ...props
}: RadioFieldProps) {
  return (
    <Stack mb="xs">
      {label && <Text>{label}</Text>}
      {options?.map(option => (
        <MantineRadio
          key={option.key ?? option.value}
          disabled={!!option?.disabled}
          checked={option.value === value}
          id={`${id}-${option.key ?? escape(option.value)}`}
          name={name}
          label={option.label ?? option.value}
          value={option.value}
          onChange={() => {
            if (!readOnly) {
              onChange(option.value);
            }
          }}
          {...filterDOMProps(props)}
        />
      ))}
    </Stack>
  );
}

export default connectField<RadioFieldProps>(Radio, { kind: 'leaf' });
