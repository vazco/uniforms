import React, { Ref } from 'react';
import { HTMLFieldProps, connectField, filterDOMProps } from 'uniforms';

export type BoolFieldProps = HTMLFieldProps<
  boolean,
  HTMLDivElement,
  { inputRef?: Ref<HTMLInputElement> }
>;

function Bool({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  value,
  ...props
}: BoolFieldProps) {
  return (
    <div {...filterDOMProps(props)}>
      <input
        checked={value || false}
        disabled={disabled}
        id={id}
        name={name}
        onChange={
          disabled
            ? undefined
            : () => {
                onChange(!value);
              }
        }
        ref={inputRef}
        type="checkbox"
      />

      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
}

export default connectField(Bool, { kind: 'leaf' });
