import Checkbox from 'antd/lib/checkbox';
import Icon from 'antd/lib/icon';
import React from 'react';
import Switch from 'antd/lib/switch';
import { connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

const Bool = ({ checkbox, ...props }: any) =>
  wrapField(
    props,
    React.createElement(checkbox ? (Checkbox as any) : Switch, {
      checked: props.value,
      disabled: props.disabled,
      id: props.id,
      name: props.name,
      onChange: () => props.onChange(!props.value),
      ref: props.inputRef,
      ...filterDOMProps(props),
    }),
  );
Bool.defaultProps = {
  checkbox: false,
  checkedChildren: <Icon type="check" />,
  unCheckedChildren: <Icon type="close" />,
};

export default connectField(Bool, { ensureValue: false });
