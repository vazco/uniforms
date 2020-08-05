import Checkbox, { CheckboxProps } from 'antd/lib/checkbox';
import React, { Ref } from 'react';
import Switch, { SwitchProps } from 'antd/lib/switch';
import { connectField, FieldProps, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type BoolFieldProps = FieldProps<
  boolean,
  // FIXME: `onClick` uses instance type.
  Omit<CheckboxProps | SwitchProps, 'onClick'>,
  // FIXME: `Switch` is a value and exporting `typeof Switch` type is impossible.
  { checkbox?: boolean; inputRef?: Ref<Checkbox | typeof Switch | any> }
>;

function Bool({
  checkbox = false,
  disabled,
  inputRef,
  name,
  onChange,
  value,
  ...props
}: BoolFieldProps) {
  const Component = checkbox ? Checkbox : Switch;
  return wrapField(
    props,
    <Component
      checked={value || false}
      disabled={disabled}
      name={name}
      onChange={() => onChange(!value)}
      ref={inputRef}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField(Bool, { kind: 'leaf' });
