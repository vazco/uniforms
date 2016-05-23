import React      from 'react';
import classnames from 'classnames';

import gridClassName from '../../lib/gridClassName';

const FormGroup = ({
    children,
    className,         // class name for the whole .form-group
    disabled,          // boolean, if true, show fields as disabled
    error,             // error validation response
    grid,              // grid is either a int [1-11] or object {xs:6,sm:4,md:2}
    help,              // help text
    helpClassName,     // class name for the help text (default: 'text-muted')
    label,             // string label (or false)
    required,
    wrapClassName,     // class name for the div wrapping the input(s)
    ...props
}) => {
    console.info('FormGroup', props);

    const helpNice = help && (
        <span className={helpClassName || 'text-muted'}>
            {help}
        </span>
    );

    return (
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
                    {helpNice}
                </div>
            ) : (
                <span>
                    {children}
                    {helpNice}
                </span>
            )}
        </section>
    );
};

export default FormGroup;
