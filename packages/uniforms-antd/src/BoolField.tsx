import CheckOutlined from '@ant-design/icons/CheckOutlined';
import Checkbox, { CheckboxProps } from 'antd/lib/checkbox';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import React, { Ref, createElement } from 'react';
import Switch, { SwitchProps } from 'antd/lib/switch';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type BoolFieldProps = FieldProps<
  boolean,
  // FIXME: `onClick` uses instance type.
  Omit<CheckboxProps | SwitchProps, 'onClick'>,
  // FIXME: `Switch` is a value and exporting `typeof Switch` type is impossible.
  { checkbox?: boolean; inputRef?: Ref<Checkbox | typeof Switch | any> }
>;

function Bool({
  checkbox,
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

Bool.defaultProps = {
  checkbox: false,
  checkedChildren: <CheckOutlined />,
  unCheckedChildren: <CloseOutlined />,
};

export default connectField(Bool, { kind: 'leaf' });
