import Icon from 'antd/lib/icon';
import React, { Children, HTMLProps, ReactNode, cloneElement } from 'react';
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
        ? value.map((item: any, index: number) =>
            Children.map(children as JSX.Element, child =>
              cloneElement(child, {
                key: index,
                label: null,
                name: joinName(
                  name,
                  child.props.name && child.props.name.replace('$', index),
                ),
              }),
            ),
          )
        : value.map((item: any, index: number) => (
            <ListItemField
              key={index}
              label={undefined}
              labelCol={labelCol}
              name={joinName(name, index)}
              wrapperCol={wrapperCol}
              {...itemProps}
            />
          ))}

      <ListAddField name={`${name}.$`} initialCount={initialCount} />
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

export default connectField<ListFieldProps<any>>(List, {
  includeInChain: false,
});
