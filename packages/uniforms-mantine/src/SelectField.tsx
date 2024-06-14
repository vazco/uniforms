import {
  Select as SelectMantine,
  ComboboxItem,
  SelectProps,
  MultiSelect,
  MultiSelectProps,
} from '@mantine/core';
import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

export type SelectFieldProps = FieldProps<
  string | string[],
  Omit<SelectProps, 'maxDropdownHeight' | 'filter' | 'data'> &
    Omit<MultiSelectProps, 'maxDropdownHeight' | 'filter' | 'data'>,
  {
    options: string[] | ComboboxItem[];
    inputRef?: Ref<HTMLInputElement>;
  }
>;

function Select({
  options,
  disabled,
  fieldType,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  required,
  value,
  showInlineError,
  error,
  errorMessage,
  ...props
}: SelectFieldProps) {
  const multiple = fieldType === Array;

  if (multiple) {
    return (
      <MultiSelect
        {...filterDOMProps(props)}
        data={options}
        disabled={disabled}
        error={showInlineError && !!error && errorMessage}
        ref={inputRef}
        label={label}
        name={name}
        onChange={(item?: string) => {
          if (!readOnly) {
            onChange(item);
          }
        }}
        placeholder={placeholder}
        required={required ?? false}
        defaultValue={[]}
        value={value}
        mb="xs"
      />
    );
  }

  return (
    <SelectMantine
      mb="xs"
      {...filterDOMProps(props)}
      data={options}
      disabled={disabled}
      error={showInlineError && !!error && errorMessage}
      ref={inputRef}
      label={label}
      name={name}
      onChange={(item: string) => {
        if (!readOnly) {
          onChange(item ?? '');
        }
      }}
      placeholder={placeholder}
      required={required ?? false}
      defaultValue={null}
      value={value}
    />
  );
}

export default connectField<SelectFieldProps>(Select, { kind: 'leaf' });
