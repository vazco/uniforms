import React      from 'react';
import classnames from 'classnames';

import gridClassName from './gridClassName';

export default function wrapField ({
    className,
    disabled,
    error,
    errorMessage,
    feedbackable,    // Only some input types support feedback icons.
    grid,            // Grid is either an number between 1 and 11 or an object with keys like xs and md.
    help,            // Help text.
    helpClassName,   // Help text class name.
    id,
    label,
    required,
    showInlineError, // Show inline error message?
    wrapClassName    // Input wrapper class name.
}, children) {
    const hasWrap = !!(grid || wrapClassName);

    const blockError = !!(errorMessage && showInlineError) && (
        <span className="help-block">
            {errorMessage}
        </span>
    );

    const blockFeedback = !!(error && feedbackable) && (
        <i className="glyphicon glyphicon-remove form-control-feedback" />
    );

    const blockHelp = !!help && (
        <span className={classnames('help-block', helpClassName)}>
            {help}
        </span>
    );

    return (
        <div
            className={classnames(
                className,
                'field',
                'form-group',
                {
                    'has-feedback': error && feedbackable,
                    'has-error': error,
                    disabled,
                    required
                }
            )}
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
