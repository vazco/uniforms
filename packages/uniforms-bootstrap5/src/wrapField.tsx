import classnames from 'classnames';
import omit from 'lodash/omit';
import React, { HTMLProps, ReactNode } from 'react';
import { Override, filterDOMProps } from 'uniforms';

import gridClassName from './gridClassName';

type WrapperProps = Override<
  Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
  {
    error?: unknown;
    errorMessage?: string;
    grid?: number | string | Record<string, number>;
    help?: string;
    helpClassName?: string;
    label?: ReactNode;
    labelClassName?: string | string[];
    showInlineError?: boolean;
    value?: boolean | string | number | string[] | undefined;
    wrapClassName?: string;
  }
>;

export default function wrapField(
  {
    className,
    disabled,
    error,
    errorMessage,
    grid, // Grid is either an number between 1 and 11 or an object with keys like xs and md.
    help, // Help text.
    helpClassName, // Help text class name.
    id,
    label,
    labelClassName, // Label class name (String|Array[String]).
    required,
    showInlineError, // Show inline error message?
    wrapClassName, // Input wrapper class name.
    ...props
  }: WrapperProps,
  children: ReactNode,
) {
  const hasWrap = !!(grid || wrapClassName);
  const blockError = !!(error && showInlineError) && (
    <span className="form-text text-danger">{errorMessage}</span>
  );
  const blockHelp = !!help && (
    <span className={classnames('form-text', helpClassName || 'text-muted')}>
      {help}
    </span>
  );

  return (
    <div
      className={classnames(className, 'form-group mb-3', {
        'is-invalid': error,
        disabled,
        required,
        row: grid,
      })}
      {...omit(filterDOMProps(props), [
        'checkboxes',
        'inline',
        'inputClassName',
        'inputRef',
        'rows',
        'transform',
      ])}
    >
      {label && (
        <label
          htmlFor={id}
          className={classnames(
            {
              'col-form-label': grid,
              'text-danger': error,
            },
            gridClassName(grid, 'label'),
            labelClassName,
          )}
        >
          {label}
        </label>
      )}

      {hasWrap && (
        <div
          className={classnames(wrapClassName, gridClassName(grid, 'input'))}
        >
          {children}
          {blockHelp}
          {blockError}
        </div>
      )}

      {!hasWrap && children}
      {!hasWrap && blockHelp}
      {!hasWrap && blockError}
    </div>
  );
}

declare module 'uniforms' {
  interface FilterDOMProps {
    grid: never;
  }
}
