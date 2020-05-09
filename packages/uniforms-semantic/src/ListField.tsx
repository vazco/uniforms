import React, {
  Children,
  HTMLProps,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import classnames from 'classnames';
import { Override, connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps<T> = Override<
  HTMLProps<HTMLDivElement>,
  {
    children?: ReactNode;
    error?: boolean;
    errorMessage?: string;
    initialCount?: number;
    itemProps?: {};
    name: string;
    showInlineError?: boolean;
    value: T[];
  }
>;

function List<T>({
  children,
  className,
  disabled,
  error,
  errorMessage,
  initialCount,
  itemProps,
  label,
  name,
  required,
  showInlineError,
  value,
  ...props
}: ListFieldProps<T>) {
  return (
    <div
      className={classnames(
        'ui',
        className,
        { disabled },
        'grouped fitted fields list',
      )}
      {...filterDOMProps(props)}
    >
      {label && (
        <div className={classnames({ error, required }, 'field item')}>
          <label className="left floated">{label}</label>

          <ListAddField
            className="right floated"
            initialCount={initialCount}
            name="$"
          />
        </div>
      )}

      {label && (
        <div className="ui fitted hidden clearing horizontal divider" />
      )}

      {!!(error && showInlineError) && (
        <div className="ui red basic label">{errorMessage}</div>
      )}

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
            <ListItemField key={index} name={'' + index} {...itemProps} />
          ))}
    </div>
  );
}

export default connectField(List);
