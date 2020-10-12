import React, { Ref } from 'react';
import { HTMLFieldProps, connectField, filterDOMProps } from 'uniforms';

export type TextFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLInputElement> }
>;

function Text({
  autocomplete,
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
  ...props
}: TextFieldProps) {
  return (
    <div {...filterDOMProps(props)}>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        autocomplete={autocomplete}
        disabled={disabled}
        id={id}
        name={name}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        ref={inputRef}
        type={type}
        value={value ?? ''}
      />
    </div>
  );
}

Text.defaultProps = { type: 'text' };

export default connectField(Text, { kind: 'leaf' });
