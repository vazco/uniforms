import React, {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import Tooltip from 'antd/lib/tooltip';
import classNames from 'classnames';
import { HTMLFieldProps, connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = HTMLFieldProps<
  unknown[],
  HTMLDivElement,
  {
    addIcon?: ReactNode;
    children?: ReactNode;
    info?: string;
    initialCount?: number;
    itemProps?: {};
    labelCol?: any;
    wrapperCol?: any;
  }
>;

const defaultStyle = {
  marginBottom: '5px',
  marginTop: '5px',
  padding: '10px',
};

function List({
  children = <ListItemField name="$" />,
  error,
  errorMessage,
  info,
  initialCount,
  itemProps,
  label,
  labelCol,
  showInlineError,
  style = defaultStyle,
  value,
  wrapperCol,
  ...props
}: ListFieldProps) {
  return (
    <div
      {...filterDOMProps(props)}
      style={style}
      className={classNames([props.className, 'ant-list', 'ant-list-bordered'])}
    >
      {label && (
        <div>
          {label}
          {!!info && (
            <span>
              &nbsp;
              <Tooltip title={info}>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          )}
        </div>
      )}

      {!!(error && showInlineError) && <div>{errorMessage}</div>}

      {value?.map((item, itemIndex) =>
        Children.map(children, (child, childIndex) =>
          isValidElement(child)
            ? cloneElement(child, {
                key: `${itemIndex}-${childIndex}`,
                name: child.props.name?.replace('$', '' + itemIndex),
                labelCol,
                wrapperCol,
                ...itemProps,
              })
            : child,
        ),
      )}

      <ListAddField name="$" initialCount={initialCount} />
    </div>
  );
}

export default connectField(List);
