import React from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';
import { filterDOMProps } from 'uniforms';

import gridClassName from './gridClassName';

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
  }: Record<string, any>,
  children,
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
