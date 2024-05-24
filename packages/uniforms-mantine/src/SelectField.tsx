import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';
import {
  Select as SelectMantine,
  ComboboxItem,
  SelectProps,
  MultiSelect,
  MultiSelectProps,
} from '@mantine/core';

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
        onChange={item => {
          if (!readOnly) {
            onChange(item);
          }
        }}
        placeholder={placeholder}
        required={required ?? false}
        defaultValue={[]}
        value={value as string[]}
        mb={12}
      />
    );
  }

  return (
    <SelectMantine
      {...filterDOMProps(props)}
      data={options}
      disabled={disabled}
      error={showInlineError && !!error && errorMessage}
      ref={inputRef}
      label={label}
      name={name}
      onChange={item => {
        if (!readOnly) {
          onChange(item ?? '');
        }
      }}
      placeholder={placeholder}
      required={required ?? false}
      defaultValue={null}
      value={value as string}
    />
  );
}

export default connectField<SelectFieldProps>(Select, { kind: 'leaf' });
