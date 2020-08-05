import Checkbox, { CheckboxProps } from 'antd/lib/checkbox';
import React, { ReactNode, Ref } from 'react';
import Switch, { SwitchProps } from 'antd/lib/switch';
import { connectField, FieldProps, filterDOMProps } from 'uniforms';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

import wrapField from './wrapField';

export type BoolFieldProps = FieldProps<
  boolean,
  // FIXME: `onClick` uses instance type.
  Omit<CheckboxProps | SwitchProps, 'onClick'>,
  // FIXME: `Switch` is a value and exporting `typeof Switch` type is impossible.
  {
    checkbox?: boolean;
    inputRef?: Ref<Checkbox | typeof Switch | any>;
    checkedChildren?: string | ReactNode;
    unCheckedChildren?: string | ReactNode;
  }
>;

function Bool({
  checkbox = false,
  disabled,
  inputRef,
  name,
  onChange,
  value,
  checkedChildren = <CheckOutlined />,
  unCheckedChildren = <CloseOutlined />,
  ...props
}: BoolFieldProps) {
  const Component = checkbox ? Checkbox : Switch;
  const componentProps = checkbox ? {} : { checkedChildren, unCheckedChildren };
  return wrapField(
    props,
    <Component
      checked={value || false}
      disabled={disabled}
      name={name}
      onChange={() => onChange(!value)}
      ref={inputRef}
      {...componentProps}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField(Bool, { kind: 'leaf' });
