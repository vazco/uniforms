import React, { Children, HTMLProps, ReactNode, cloneElement } from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps, joinName, Override } from 'uniforms';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

export type ListFieldProps<T> = Override<
  HTMLProps<HTMLDivElement>,
  {
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
  const listAddProps = {
    name: `${name}.$`,
    initialCount,
    addIcon,
  };
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

            <ListAddField {...listAddProps} />

            {!!(error && showInlineError) && (
              <span className="help-block">{errorMessage}</span>
            )}
          </div>
        )}

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
    </div>
  );
}

export default connectField<ListFieldProps<any>>(List, {
  includeInChain: false,
});
