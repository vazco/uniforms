import Icon from 'antd/lib/icon';
import React, { Children, HTMLProps, ReactNode } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { connectField, filterDOMProps, joinName } from 'uniforms';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

type ListFieldProps<T> = {
  value: T[];
  children?: ReactNode;
  addIcon?: any;
  error?: boolean;
  info?: boolean;
  errorMessage?: string;
  initialCount?: number;
  itemProps?: {};
  labelCol?: any;
  wrapperCol?: any;
  name: string;
  showInlineError?: boolean;
} & Omit<HTMLProps<HTMLUListElement>, 'children' | 'name'>;

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
    <ul {...filterDOMProps(props)}>
      {!!label && (
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
              React.cloneElement(child, {
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
    </ul>
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
