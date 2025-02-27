import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import Tooltip from 'antd/lib/tooltip';
import classNames from 'classnames';
import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = HTMLFieldProps<
  unknown[],
  HTMLDivElement,
  {
    addIcon?: ReactNode;
    children?: ReactNode;
    info?: string;
    itemProps?: object;
    labelCol?: any;
    wrapperCol?: any;
  }
>;

const defaultStyle = {
  marginBottom: '5px',
  marginTop: '5px',
  padding: '10px',
};

const errorStyle = { borderColor: 'rgb(255, 85, 0)' };

function List({
  children = <ListItemField name="$" />,
  className,
  error,
  errorMessage,
  info,
  itemProps,
  label,
  labelCol,
  showInlineError,
  style = defaultStyle,
  value,
  wrapperCol,
  ...props
}: ListFieldProps) {
  const wrapperStyle = error
    ? style
      ? { ...errorStyle, ...style }
      : errorStyle
    : style;

  return (
    <div
      {...filterDOMProps(props)}
      style={wrapperStyle}
      className={classNames([className, 'ant-list', 'ant-list-bordered'])}
    >
      {!!label && (
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
            ? cloneElement<any>(child as ReactElement, {
                key: `${itemIndex}-${childIndex}`,
                // @ts-expect-error
                name: child.props.name?.replace('$', '' + itemIndex),
                labelCol,
                wrapperCol,
                ...itemProps,
              })
            : child,
        ),
      )}

      <ListAddField name="$" />
    </div>
  );
}

export default connectField<ListFieldProps>(List);
