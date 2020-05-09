import React, {
  Children,
  HTMLProps,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import classnames from 'classnames';
import { Override, connectField, filterDOMProps } from 'uniforms';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

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
      className={classnames('card mb-3', className)}
      {...filterDOMProps(props)}
    >
      <div className="card-body">
        {label && (
          <div className="card-title">
            <label className="col-form-label">{label}&nbsp;</label>

            <ListAddField
              addIcon={addIcon}
              initialCount={initialCount}
              name="$"
            />

            {!!(error && showInlineError) && (
              <span className="text-danger">{errorMessage}</span>
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
