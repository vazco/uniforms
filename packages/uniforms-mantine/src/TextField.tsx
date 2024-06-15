import { TextInput, TextInputProps } from '@mantine/core';
import React, { ChangeEvent, Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

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
        mb="xs"
        label={label}
        autoComplete={autoComplete}
        error={showInlineError && !!error && errorMessage}
        disabled={disabled}
        id={id}
        name={name}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        readOnly={readOnly}
        ref={inputRef}
        type={type}
        value={value ?? ''}
        w="100%"
        {...filterDOMProps(props)}
      />
    </div>
  );
}

export default connectField<TextFieldProps>(Text, { kind: 'leaf' });
