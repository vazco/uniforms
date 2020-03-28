import Checkbox from 'antd/lib/checkbox';
import React, { HTMLProps, Ref } from 'react';
import Switch from 'antd/lib/switch';
import { connectField, filterDOMProps } from 'uniforms';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import wrapField from './wrapField';

type BoolFieldProps = {
  value?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  onChange: (value?: boolean) => void;
  checkbox?: boolean;
} & Omit<HTMLProps<HTMLDivElement>, 'value'>;

const Bool = (props: BoolFieldProps) => {
  const { checkbox, value, disabled, name, onChange, inputRef } = props;
  return wrapField(
    props,
    React.createElement(checkbox ? (Checkbox as any) : Switch, {
      checked: value || false,
      disabled,
      id: props.id,
      name,
      onChange: () => onChange(!value),
      ref: inputRef,
      ...filterDOMProps(props),
    }),
  );
};

Bool.defaultProps = {
  checkbox: false,
  checkedChildren: <CheckOutlined />,
  unCheckedChildren: <CloseOutlined />,
};

export default connectField(Bool);
