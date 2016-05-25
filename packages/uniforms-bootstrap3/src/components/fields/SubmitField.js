import React       from 'react';
import classnames  from 'classnames';
import {BaseField} from 'uniforms';

import gridClassName from '../../lib/gridClassName';

const SubmitField = ({className, wrapClassName, grid, ...props}, {uniforms: {error, state: {disabled} = {}}}) => {
    const button = (
        <input
            className={classnames(className, 'btn btn-primary')}
            disabled={error || disabled ? true : null}
            type="submit"
        />
    );

    return (
        <section className={classnames(className, {disabled, 'has-danger': error, row: grid})} {...props}>
            <label className={classnames('form-control-label', gridClassName(grid, 'label'))}>
                &nbsp;
            </label>

            {(grid || wrapClassName) ? (
                <section className={classnames(wrapClassName, gridClassName(grid, 'input'))}>
                    {button}
                </section>
            ) : (
                <span>
                    {button}
                </span>
            )}
        </section>
    );
};

SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
