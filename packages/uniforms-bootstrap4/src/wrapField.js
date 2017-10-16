import React          from 'react';
import classnames     from 'classnames';
import filterDOMProps from 'uniforms/filterDOMProps';

import gridClassName from './gridClassName';

export default function wrapField ({
    checkboxes,      // eslint-disable-line no-unused-vars
    className,
    disabled,
    error,
    errorMessage,
    grid,            // Grid is either an number between 1 and 11 or an object with keys like xs and md.
    help,            // Help text.
    helpClassName,   // Help text class name.
    id,
    inline,          // eslint-disable-line no-unused-vars
    inputClassName,  // eslint-disable-line no-unused-vars
    inputRef,        // eslint-disable-line no-unused-vars
    label,
    required,
    rows,            // eslint-disable-line no-unused-vars
    showInlineError, // Show inline error message?
    transform,       // eslint-disable-line no-unused-vars
    wrapClassName,   // Input wrapper class name.
    ...props
}, children) {
    const hasWrap = !!(grid || wrapClassName);

    const blockError = !!(error && showInlineError) && (
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
        <div
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
            {...filterDOMProps(props)}
        >
            {label && (
                <label
                    htmlFor={id}
                    className={classnames(
                        'form-control-label', // bootstrap4 < alpha6
                        {'col-form-label': grid}, // bootstrap4 > alpha5
                        gridClassName(grid, 'label')
                    )}
                >
                    {label}
                </label>
            )}

            {hasWrap && (
                <div className={classnames(wrapClassName, gridClassName(grid, 'input'))}>
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
