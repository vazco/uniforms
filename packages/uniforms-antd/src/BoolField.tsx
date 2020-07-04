import Checkbox from 'antd/lib/checkbox';
import React, { createElement, HTMLProps, Ref } from 'react';
import Switch from 'antd/lib/switch';
import { connectField, filterDOMProps, Override } from 'uniforms';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

import wrapField from './wrapField';

export type BoolFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    checkbox?: boolean;
    inputRef?: Ref<HTMLInputElement>;
    onChange(value?: boolean): void;
    onReset?: () => void;
    value?: boolean;
  }
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
  return wrapField(
    props,
    createElement(checkbox ? (Checkbox as any) : Switch, {
      checked: value || false,
      disabled,
      id: props.id,
      name,
      onChange: () => onChange(!value),
      ref: inputRef,
      ...filterDOMProps(props),
    }),
  );
}

Bool.defaultProps = {
  checkbox: false,
  checkedChildren: <CheckOutlined />,
  unCheckedChildren: <CloseOutlined />,
};

export default connectField(Bool, { kind: 'leaf' });
