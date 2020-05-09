import Icon from 'antd/lib/icon';
import React, {
  Children,
  HTMLProps,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import Tooltip from 'antd/lib/tooltip';
import { connectField, filterDOMProps, joinName, Override } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps<T> = Override<
  HTMLProps<HTMLDivElement>,
  {
    addIcon?: any;
    children?: ReactNode;
    error?: boolean;
    errorMessage?: string;
    info?: boolean;
    initialCount?: number;
    itemProps?: {};
    label: string;
    labelCol?: any;
    name: string;
    showInlineError?: boolean;
    value: T[];
    wrapperCol?: any;
  }
>;
function List<T>({
  children,
  error,
  errorMessage,
  info,
  initialCount,
  itemProps,
  label,
  labelCol,
  name,
  showInlineError,
  value,
  wrapperCol,
  ...props
}: ListFieldProps<T>) {
  return (
    <div {...filterDOMProps(props)}>
      {label && (
        <div>
          {label}
          {!!info && (
            <span>
              &nbsp;
              <Tooltip title={info}>
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        </div>
      )}

      {!!(error && showInlineError) && <div>{errorMessage}</div>}

      {children
        ? value.map((item, index) =>
            Children.map(children, child =>
              isValidElement(child) && child.props.name
                ? cloneElement(child, {
                    key: index,
                    name: child.props.name.replace('$', '' + index),
                  })
                : child,
            ),
          )
        : value.map((item, index) => (
            <ListItemField
              key={index}
              labelCol={labelCol}
              name={'' + index}
              wrapperCol={wrapperCol}
              {...itemProps}
            />
          ))}

      <ListAddField name="$" initialCount={initialCount} />
    </div>
  );
}

List.defaultProps = {
  style: {
    border: '1px solid #DDD',
    borderRadius: '7px',
    marginBottom: '5px',
    marginTop: '5px',
    padding: '10px',
  },
};

export default connectField(List);
