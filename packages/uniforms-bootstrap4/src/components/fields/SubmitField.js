import React            from 'react';
import classnames       from 'classnames';
import {BaseField}      from 'uniforms';
import {filterDOMProps} from 'uniforms';

import gridClassName from '../../lib/gridClassName';

const SubmitField = ({
    className,
    inputClassName,
    inputRef,
    value,
    wrapClassName,
    ...props
}, {
    uniforms: {
        error,
        state: {
            disabled,
            grid
        }
    }
}) => {
    const hasWrap = !!(grid || wrapClassName);

    const blockInput = (
        <input
            className={inputClassName}
            disabled={!!(error || disabled)}
            ref={inputRef}
            type="submit"
            value={value}
        />
    );

    return (
        <section className={classnames(className, {'has-danger': error, row: grid})} {...filterDOMProps(props)}>
            {hasWrap && (
                <label className={classnames('form-control-label', gridClassName(grid, 'label'))}>
                    &nbsp;
                </label>
            )}

            {hasWrap && (
                <section className={classnames(wrapClassName, gridClassName(grid, 'input'))}>
                    {blockInput}
                </section>
            )}

            {!hasWrap && blockInput}
        </section>
    );
};

SubmitField.contextTypes = BaseField.contextTypes;
SubmitField.defaultProps = {
    inputClassName: 'btn btn-primary'
};

export default SubmitField;
