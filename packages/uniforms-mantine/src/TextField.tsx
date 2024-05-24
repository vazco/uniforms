import React, { Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';
import { TextInput, TextInputProps } from '@mantine/core';

export type TextFieldProps = FieldProps<
  string,
  TextInputProps,
  { inputRef?: Ref<HTMLInputElement> }
>;

function Text({
  autoComplete,
  error,
  errorMessage,
  showInlineError,
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  type,
  value,
  ...props
}: TextFieldProps) {
  return (
    <div>
      <TextInput
        label={label}
        autoComplete={autoComplete}
        error={showInlineError && !!error && errorMessage}
        disabled={disabled}
        id={id}
        name={name}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={inputRef}
        type={type ?? 'text'}
        value={value ?? ''}
        w="100%"
        {...filterDOMProps(props)}
      />
    </div>
  );
}

Text.defaultProps = { type: 'text' };

export default connectField<TextFieldProps>(Text, { kind: 'leaf' });
