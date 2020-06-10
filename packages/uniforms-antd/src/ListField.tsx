import Icon from 'antd/lib/icon';
import React, {
  Children,
  HTMLProps,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import Tooltip from 'antd/lib/tooltip';
import { connectField, filterDOMProps, Override } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = Override<
  Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
  {
    addIcon?: ReactNode;
    children?: ReactNode;
    error?: boolean;
    errorMessage?: string;
    info?: string;
    initialCount?: number;
    itemProps?: {};
    label: string;
    labelCol?: any;
    name: string;
    showInlineError?: boolean;
    value: unknown[];
    wrapperCol?: any;
  }
>;

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
  value,
  wrapperCol,
  ...props
}: ListFieldProps) {
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

      {value.map((item, itemIndex) =>
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
