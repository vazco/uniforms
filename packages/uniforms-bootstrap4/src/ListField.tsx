import React, { Children, HTMLProps, ReactNode } from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps, joinName } from 'uniforms';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

type ListFieldProps<T> = {
  value: T[];
  name: string;
  children?: ReactNode;
  addIcon?: any;
  error?: boolean;
  errorMessage?: string;
  initialCount?: number;
  itemProps?: {};
  removeIcon?: any;
  showInlineError?: boolean;
} & Omit<HTMLProps<HTMLUListElement>, 'children' | 'name'>;

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
  const listAddProps = {
    name: `${name}.$`,
    initialCount,
    addIcon,
  };
  return (
    <ul
      className={classnames('card mb-3', className)}
      {...filterDOMProps(props)}
    >
      <div className="card-body">
        {label && (
          <div className="card-title">
            <label className="col-form-label">{label}&nbsp;</label>

            <ListAddField {...listAddProps} />

            {!!(error && showInlineError) && (
              <span className="text-danger">{errorMessage}</span>
            )}
          </div>
        )}

        {children
          ? value.map((item, index) =>
              Children.map(children as JSX.Element, child =>
                React.cloneElement(child, {
                  key: index,
                  label: null,
                  name: joinName(
                    name,
                    child.props.name && child.props.name.replace('$', index),
                  ),
                  removeIcon,
                }),
              ),
            )
          : value.map((item, index) => (
              <ListItemField
                key={index}
                label={undefined}
                name={joinName(name, index)}
                removeIcon={removeIcon}
                {...itemProps}
              />
            ))}
      </div>
    </ul>
  );
}

export default connectField<ListFieldProps<any>>(List, {
  includeInChain: false,
});
