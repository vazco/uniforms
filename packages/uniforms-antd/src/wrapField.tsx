import Form from 'antd/lib/form';
import React from 'react';
import Tooltip from 'antd/lib/tooltip';
import { filterDOMProps } from 'uniforms';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default function wrapField(
  {
    colon,
    error,
    errorMessage,
    extra,
    id,
    info,
    help,
    label,
    labelCol,
    required,
    showInlineError,
    wrapperCol,
    wrapperStyle,
  }: Record<string, any>,
  children,
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
      help={help || (showInlineError && error && errorMessage)}
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

filterDOMProps.register('colon', 'labelCol', 'wrapperCol', 'wrapperStyle');
