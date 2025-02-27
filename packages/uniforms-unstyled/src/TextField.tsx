import React, { Ref } from 'react';
import { HTMLFieldProps, connectField, filterDOMProps } from 'uniforms';

export type TextFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLInputElement> }
>;

function Text({
  autoComplete,
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  type = 'text',
  value,
  ...props
}: TextFieldProps) {
  return (
    <div {...filterDOMProps(props)}>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        autoComplete={autoComplete}
        disabled={disabled}
        id={id}
        name={name}
        onChange={event =>
          onChange(event.target.value === '' ? undefined : event.target.value)
        }
        placeholder={placeholder}
        readOnly={readOnly}
        ref={inputRef}
        type={type}
        value={value ?? ''}
      />
    </div>
  );
}

export default connectField<TextFieldProps>(Text, { kind: 'leaf' });
