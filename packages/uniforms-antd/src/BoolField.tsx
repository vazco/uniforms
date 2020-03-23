import Checkbox from 'antd/lib/checkbox';
import Icon from 'antd/lib/icon';
import React, { HTMLProps, Ref } from 'react';
import Switch from 'antd/lib/switch';
import { connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

type BoolFieldProps = {
  value?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  onChange: (value?: boolean) => void;
  checkbox?: boolean;
} & Omit<HTMLProps<HTMLDivElement>, 'value'>;

const Bool = ({
  checkbox,
  value,
  disabled,
  name,
  onChange,
  inputRef,
  ...props
}: BoolFieldProps) =>
  wrapField(
    props,
    React.createElement(checkbox ? (Checkbox as any) : Switch, {
      checked: value,
      disabled,
      id: props.id,
      name,
      onChange: () => onChange(!value),
      ref: inputRef,
      ...filterDOMProps(props),
    }),
  );

Bool.defaultProps = {
  checkbox: false,
  checkedChildren: <Icon type="check" />,
  unCheckedChildren: <Icon type="close" />,
};

export default connectField(Bool);
