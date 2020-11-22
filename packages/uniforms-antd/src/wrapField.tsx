import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import Form, { FormItemProps } from 'antd/lib/form';
import Tooltip from 'antd/lib/tooltip';
import omit from 'lodash/omit';
import React, { ReactNode } from 'react';
import { filterDOMProps, Override } from 'uniforms';

const filteredProps = [
  'checkboxes',
  'colon',
  'disableItem',
  'labelCol',
  'validateStatus',
  'wrapperCol',
  'wrapperStyle',
] as const;

function __filterProps<T extends object>(props: T) {
  return omit(props, filteredProps) as Omit<T, typeof filteredProps[number]>;
}

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

const defaultWrapperStyle = { marginBottom: '12px' };

function wrapField(
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
    validateStatus,
    wrapperCol,
    wrapperStyle = defaultWrapperStyle,
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
      validateStatus={error ? 'error' : validateStatus}
      wrapperCol={wrapperCol}
    >
      {children}
    </Form.Item>
  );
}

export default Object.assign(wrapField, { __filterProps });
