import {
  Select as SelectMantine,
  SelectItem,
  SelectProps,
  MultiSelect,
  MultiSelectProps,
} from '@mantine/core';
import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

export type SelectFieldProps = FieldProps<
  string | string[],
  | Omit<SelectProps, 'maxDropdownHeight' | 'filter' | 'data'>
  | Omit<MultiSelectProps, 'maxDropdownHeight' | 'filter' | 'data'>,
  {
    allowedValues: string[] | SelectItem[];
    inputRef?: Ref<HTMLInputElement>;
  }
>;

function Select({
  allowedValues,
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
        data={allowedValues}
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
        sx={{ marginBottom: 12 }}
      />
    );
  }

  return (
    <SelectMantine
      {...filterDOMProps(props)}
      data={allowedValues}
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
