import React       from 'react';
import classnames  from 'classnames';
import {BaseField} from 'uniforms';

import gridClassName from '../../lib/gridClassName';

const SubmitField = ({className, wrapClassName, ...props}, {uniforms: {error, state: {disabled, grid} = {}}}) =>
    <section className={classnames(className, {'has-danger': error, row: grid})} {...props}>
        {(grid || wrapClassName) && (
            <label className={classnames('form-control-label', gridClassName(grid, 'label'))}>
                &nbsp;
            </label>
        )}

        {(grid || wrapClassName) ? (
            <section className={classnames(wrapClassName, gridClassName(grid, 'input'))}>
                <input className="btn btn-primary" disabled={error || disabled ? true : null} type="submit" />
            </section>
        ) : (
            <input className="btn btn-primary" disabled={error || disabled ? true : null} type="submit" />
        )}
    </section>
;

SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
