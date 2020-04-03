import classnames from 'classnames';
import omit from 'lodash/omit';
import React, { ReactNode, HTMLProps } from 'react';
import { filterDOMProps } from 'uniforms';

import gridClassName from './gridClassName';

type WrapperProps = {
  error?: boolean;
  errorMessage?: string;
  feedbackable?: boolean;
  grid?: object | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  help?: string;
  helpClassName?: string;
  labelClassName?: string;
  showInlineError?: boolean;
  value?: boolean | string | number | string[] | undefined;
  wrapClassName?: string;
} & Omit<HTMLProps<HTMLDivElement>, 'value'>;

// eslint-disable-next-line complexity
export default function wrapField(
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
      {...filterDOMProps(
        omit(props, [
          'checkboxes',
          'inline',
          'inputClassName',
          'inputRef',
          'rows',
          'transform',
        ]),
      )}
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
