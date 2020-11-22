import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import Checkbox, { CheckboxProps } from 'antd/lib/checkbox';
import Switch, { SwitchProps } from 'antd/lib/switch';
import React, { ReactNode, Ref } from 'react';
import { connectField, FieldProps, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type BoolFieldProps = FieldProps<
  boolean,
  // FIXME: `onClick` uses instance type.
  Omit<CheckboxProps | SwitchProps, 'onClick'>,
  {
    checkbox?: boolean;
    checkedChildren?: ReactNode;
    // FIXME: `Switch` is a value and exporting `typeof Switch` type is impossible.
    inputRef?: Ref<Checkbox | typeof Switch | any>;
    unCheckedChildren?: ReactNode;
  }
>;

function Bool({
  checkbox = false,
  checkedChildren = <CheckOutlined />,
  disabled,
  inputRef,
  name,
  onChange,
  unCheckedChildren = <CloseOutlined />,
  value,
  ...props
}: BoolFieldProps) {
  const Component = checkbox ? Checkbox : Switch;
  return wrapField(
    props,
    <Component
      checked={value || false}
      checkedChildren={checkedChildren}
      disabled={disabled}
      name={name}
      onChange={() => onChange(!value)}
      ref={inputRef}
      unCheckedChildren={unCheckedChildren}
      {...wrapField.__filterProps(filterDOMProps(props))}
    />,
  );
}

export default connectField(Bool, { kind: 'leaf' });
