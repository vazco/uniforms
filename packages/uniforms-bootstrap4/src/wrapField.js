import React      from 'react';
import classnames from 'classnames';

import gridClassName from './gridClassName';

export default function wrapField ({
    className,
    disabled,
    error,
    errorMessage,
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
        <span className="form-text text-danger">
            {errorMessage}
        </span>
    );

    const blockHelp = !!help && (
        <span className={classnames('form-text', helpClassName || 'text-muted')}>
            {help}
        </span>
    );

    return (
        <section
            className={classnames(
                className,
                'form-group',
                {
                    'has-danger': error,
                    disabled,
                    required,
                    row: grid
                }
            )}
        >
            {label && (
                <label htmlFor={id} className={classnames('form-control-label', gridClassName(grid, 'label'))}>
                    {label}
                </label>
            )}

            {hasWrap && (
                <section className={classnames(wrapClassName, gridClassName(grid, 'input'))}>
                    {children}
                    {blockHelp}
                    {blockError}
                </section>
            )}

            {!hasWrap && children}
            {!hasWrap && blockHelp}
            {!hasWrap && blockError}
        </section>
    );
}
