import React, {
  Children,
  HTMLProps,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import classnames from 'classnames';
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
    initialCount?: number;
    itemProps?: {};
    name: string;
    removeIcon?: any;
    showInlineError?: boolean;
    value: T[];
  }
>;

function List<T>({
  addIcon,
  children,
  className,
  error,
  errorMessage,
  initialCount,
  itemProps,
  label,
  name,
  removeIcon,
  showInlineError,
  value,
  ...props
}: ListFieldProps<T>) {
  return (
    <div
      className={classnames(
        'panel panel-default',
        { 'panel-danger': error },
        className,
      )}
      {...filterDOMProps(props)}
    >
      <div className="panel-body">
        {label && (
          <div className={classnames('panel-heading', { 'has-error': error })}>
            <label className="control-label">{label}&nbsp;</label>

            <ListAddField
              addIcon={addIcon}
              initialCount={initialCount}
              name="$"
            />

            {!!(error && showInlineError) && (
              <span className="help-block">{errorMessage}</span>
            )}
          </div>
        )}

        {children
          ? value.map((item, index) =>
              Children.map(children, child =>
                isValidElement(child) && child.props.name
                  ? cloneElement(child, {
                      key: index,
                      name: child.props.name.replace('$', '' + index),
                      removeIcon,
                    })
                  : child,
              ),
            )
          : value.map((item, index) => (
              <ListItemField
                key={index}
                name={'' + index}
                removeIcon={removeIcon}
                {...itemProps}
              />
            ))}
      </div>
    </div>
  );
}

export default connectField(List);
