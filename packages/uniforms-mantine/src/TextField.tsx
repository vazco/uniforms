import { TextInput, TextInputProps } from '@mantine/core';
import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

export type TextFieldProps = FieldProps<
  string,
  TextInputProps,
  { inputRef?: Ref<HTMLInputElement> }
>;

function Text({
  disabled,
  error,
  errorMessage,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  showInlineError,
  type,
  value = '',
  ...props
}: TextFieldProps) {
  return (
    <TextInput
      disabled={disabled}
      error={showInlineError && !!error && errorMessage}
      id={id}
      name={name}
      onChange={event => onChange(event.target.value)}
      placeholder={placeholder}
      label={label}
      readOnly={readOnly}
      ref={inputRef}
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- type comes from TextInputProps */
      type={type ?? 'text'}
      value={value ?? ''}
      w="100%"
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<TextFieldProps>(Text, { kind: 'leaf' });
