import Form, { FormItemProps } from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import React, { ReactNode } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { Override, filterDOMProps } from 'uniforms';

type WrapperProps = Override<
  FormItemProps,
  {
    error?: unknown;
    errorMessage?: string;
    info?: string;
    showInlineError?: boolean;
    wrapperStyle?: object;
  }
>;

export default function wrapField(
  {
    colon,
    error,
    errorMessage,
    extra,
    help,
    id,
    info,
    label,
    labelCol,
    required,
    showInlineError,
    wrapperCol,
    wrapperStyle,
  }: WrapperProps,
  children: ReactNode,
) {
  const labelNode = !!label && (
    <span>
      {label}
      {!!info && (
        <span>
          &nbsp;
          <Tooltip title={info}>
            <Icon type="question-circle-o" />
          </Tooltip>
        </span>
      )}
    </span>
  );

  return (
    <Form.Item
      colon={colon}
      hasFeedback
      help={help || (showInlineError && !!error && errorMessage)}
      extra={extra}
      htmlFor={id}
      label={labelNode}
      labelCol={labelCol}
      required={required}
      style={wrapperStyle || { marginBottom: '12px' }}
      validateStatus={error ? 'error' : undefined}
      wrapperCol={wrapperCol}
    >
      {children}
    </Form.Item>
  );
}

declare module 'uniforms' {
  interface FilterDOMProps {
    colon: never;
    labelCol: never;
    wrapperCol: never;
    wrapperStyle: never;
  }
}

filterDOMProps.register('colon', 'labelCol', 'wrapperCol', 'wrapperStyle');
