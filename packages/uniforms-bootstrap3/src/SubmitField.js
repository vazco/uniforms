import BaseField      from 'uniforms/BaseField';
import React          from 'react';
import classnames     from 'classnames';
import filterDOMProps from 'uniforms/filterDOMProps';

import gridClassName from './gridClassName';

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
