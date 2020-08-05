import Form, { FormItemProps } from 'antd/lib/form';
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import React, { ReactNode } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { filterDOMProps, Override } from 'uniforms';

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
    wrapperStyle = { marginBottom: '12px' },
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
            <QuestionCircleOutlined />
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
      style={wrapperStyle}
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
