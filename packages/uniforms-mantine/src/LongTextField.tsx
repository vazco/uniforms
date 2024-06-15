import { Textarea, TextareaProps } from '@mantine/core';
import React, { ChangeEvent, Ref } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

export type LongTextFieldProps = FieldProps<
  string,
  TextareaProps,
  { inputRef?: Ref<HTMLTextAreaElement> }
>;

function LongText({
  disabled,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  value,
  ...props
}: LongTextFieldProps) {
  return (
    <Textarea
      mb="xs"
      label={label}
      disabled={disabled}
      name={name}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
        readOnly ? undefined : onChange(event.target.value)
      }
      placeholder={placeholder}
      ref={inputRef}
      value={value ?? ''}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<LongTextFieldProps>(LongText, { kind: 'leaf' });
