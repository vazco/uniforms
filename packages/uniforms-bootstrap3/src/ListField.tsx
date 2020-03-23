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

            <ListAddField {...listAddProps} />

            {!!(error && showInlineError) && (
              <span className="help-block">{errorMessage}</span>
            )}
          </div>
        )}

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
                  removeIcon,
                }),
              ),
            )
          : value.map((item: any, index: number) => (
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
