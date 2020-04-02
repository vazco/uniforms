import React, { Children, HTMLProps, ReactNode, cloneElement } from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps, joinName } from 'uniforms';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

export type ListFieldProps<T> = {
  children?: ReactNode;
  name: string;
  error?: boolean;
  errorMessage?: string;
  initialCount?: number;
  value: T[];
  itemProps?: {};
  showInlineError?: boolean;
} & Omit<HTMLProps<HTMLDivElement>, 'children' | 'name'>;

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
  const listAddFieldProps = {
    name: `${name}.$`,
    initialCount,
    className: 'right floated',
  };
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

          <ListAddField {...listAddFieldProps} />
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
        : value.map((item, index) => (
            <ListItemField
              key={index}
              label={undefined}
              name={joinName(name, index)}
              {...itemProps}
            />
          ))}
    </div>
  );
}

export default connectField<ListFieldProps<any>>(List, {
  includeInChain: false,
});
