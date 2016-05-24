import React      from 'react';
import classnames from 'classnames';

import gridClassName from '../../lib/gridClassName';

const makeHelp = (help, helpClassName) => help && (
    <span className={helpClassName || 'text-muted'}>
        {help}
    </span>
);

const FormGroup = ({
    grid,              // grid is either a int [1-11] or object {xs:6,sm:4,md:2}
    className,         // class name for the whole .form-group
    helpClassName,     // class name for the help text (default: 'text-muted')
    wrapClassName,     // class name for the div wrapping the input(s)
    disabled,          // boolean, if true, show fields as disabled
    error,             // error validation response
    help,              // help text
    label,             // string label (or false)
    required,
    children
}) => (
    <section
        className={classnames(
            className,
            'field',
            'form-group',
            {disabled, 'has-danger': error, required, row: grid}
        )}
    >
        {label && (
            <label className={classnames('form-control-label', gridClassName(grid, 'label'))}>
                {label}
            </label>
        )}

        {(grid || wrapClassName) ? (
            <div className={classnames(wrapClassName, gridClassName(grid, 'input'))}>
                {children}
                {makeHelp(help, helpClassName)}
            </div>
        ) : (
            <span>
                {children}
                {makeHelp(help, helpClassName)}
            </span>
        )}
    </section>
)
;

export default FormGroup;
