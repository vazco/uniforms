import React from 'react';
import classnames from 'classnames';
import filterDOMProps from 'uniforms/filterDOMProps';

import gridClassName from './gridClassName';

// eslint-disable-next-line complexity
export default function wrapField(
  {
    checkboxes, // eslint-disable-line no-unused-vars
    className,
    disabled,
    error,
    errorMessage,
    feedbackable, // Only some input types support feedback icons.
    grid, // Grid is either an number between 1 and 11 or an object with keys like xs and md.
    help, // Help text.
    helpClassName, // Help text class name.
    id,
    inline, // eslint-disable-line no-unused-vars
    inputClassName, // eslint-disable-line no-unused-vars
    inputRef, // eslint-disable-line no-unused-vars
    label,
    required,
    rows, // eslint-disable-line no-unused-vars
    showInlineError, // Show inline error message?
    transform, // eslint-disable-line no-unused-vars
    wrapClassName, // Input wrapper class name.
    ...props
  },
  children
) {
  const hasWrap = !!(grid || wrapClassName);

  const blockError = !!(error && showInlineError) && <span className="help-block">{errorMessage}</span>;

  const blockFeedback = !!(error && feedbackable) && <i className="glyphicon glyphicon-remove form-control-feedback" />;

  const blockHelp = !!help && <span className={classnames('help-block', helpClassName)}>{help}</span>;

  return (
    <div
      className={classnames(className, 'field', 'form-group', {
        'has-feedback': error && feedbackable,
        'has-error': error,
        disabled,
        required
      })}
      {...filterDOMProps(props)}
    >
      {label && (
        <label htmlFor={id} className={classnames('control-label', gridClassName(grid, 'label'))}>
          {label}
        </label>
      )}

      {hasWrap && (
        <div className={classnames(wrapClassName, gridClassName(grid, 'input'))}>
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
