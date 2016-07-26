import React      from 'react';
import classnames from 'classnames';

import gridClassName from '../../lib/gridClassName';

const makeHelp = (help, helpClassName) => help && (
    <span className={classnames(
        'help-block',
        helpClassName || 'text-muted'
    )}>
        {help}
    </span>
);

const FormGroup = ({
    children,
    className,         // class name for the whole .form-group
    disabled,          // boolean, if true, show fields as disabled
    error,             // error validation response
    errorMessage,      // errorMessage string of error
    feedbackable,      // only some input types support feedback icons
    grid,              // grid is either a int [1-11] or object {xs:6,sm:4,md:2}
    help,              // help text
    helpClassName,     // class name for the help text (default: 'text-muted')
    id,
    label,             // string label (or false)
    required,
    wrapClassName,     // class name for the section wrapping the input(s)
    showInlineError    // boolean, if true, show <span.help-text> with error message
}) =>
    <section
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

        {(grid || wrapClassName) && (
            <section className={classnames(wrapClassName, gridClassName(grid, 'input'))}>
                {children}
                {makeHelp(help, helpClassName)}
                {errorMessage && showInlineError ? makeHelp(errorMessage, 'text-help-error') : ''}
            </section>
        )}

        {!grid && !wrapClassName && children}
        {!grid && !wrapClassName && makeHelp(help, helpClassName)}
        {!grid && !wrapClassName && errorMessage && showInlineError ? makeHelp(errorMessage, 'text-help-error') : ''}
    </section>
;

export default FormGroup;
