import classnames from 'classnames';
import omit from 'lodash/omit';
import React, { HTMLProps, ReactNode } from 'react';
import { Override, filterDOMProps } from 'uniforms';

import gridClassName from './gridClassName';

const filteredProps = [
  'autoComplete',
  'checkboxes',
  'grid',
  'inline',
  'inputClassName',
  'inputRef',
  'rows',
  'transform',
] as const;

function __filterProps<T extends object>(props: T) {
  return omit(props, filteredProps) as Omit<T, typeof filteredProps[number]>;
}

type WrapperProps = Override<
  Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
  {
    error?: unknown;
    errorMessage?: string;
    feedbackable?: boolean;
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

// eslint-disable-next-line complexity
function wrapField(
  {
    className,
    disabled,
    error,
    errorMessage,
    feedbackable, // Only some input types support feedback icons.
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
    <span className="help-block">{errorMessage}</span>
  );
  const blockFeedback = !!(error && feedbackable) && (
    <i className="glyphicon glyphicon-remove form-control-feedback" />
  );
  const blockHelp = !!help && (
    <span className={classnames('help-block', helpClassName)}>{help}</span>
  );

  return (
    <div
      className={classnames(className, 'field', 'form-group', {
        'has-feedback': error && feedbackable,
        'has-error': error,
        disabled,
        required,
      })}
      {...__filterProps(filterDOMProps(props))}
    >
      {label && (
        <label
          htmlFor={id}
          className={classnames(
            'control-label',
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
          {blockFeedback}
          {blockHelp}
          {blockError}
        </div>
      )}

      {!hasWrap && children}
      {!hasWrap && blockFeedback}
      {!hasWrap && blockHelp}
      {!hasWrap && blockError}
    </div>
  );
}

export default Object.assign(wrapField, { __filterProps });
