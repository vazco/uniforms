import React from 'react';
import classnames from 'classnames';
import { BaseField, filterDOMProps } from 'uniforms';

import gridClassName from './gridClassName';

const SubmitField = (
  {
    className,
    disabled,
    inputClassName,
    inputRef,
    value,
    wrapClassName,
    ...props
  }: any,
  { uniforms: { error, state } },
) => {
  const hasWrap = !!(state.grid || wrapClassName);

  const blockInput = (
    <input
      className={inputClassName}
      disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
      ref={inputRef}
      type="submit"
      {...(value ? { value } : {})}
    />
  );

  return (
    <div
      className={classnames(className, {
        'has-danger': error,
        row: state.grid,
      })}
      {...filterDOMProps(props)}
    >
      {hasWrap && (
        <label
          className={classnames(
            'form-control-label',
            gridClassName(state.grid, 'label'),
          )}
        >
          &nbsp;
        </label>
      )}

      {hasWrap && (
        <div
          className={classnames(
            wrapClassName,
            gridClassName(state.grid, 'input'),
          )}
        >
          {blockInput}
        </div>
      )}

      {!hasWrap && blockInput}
    </div>
  );
};

SubmitField.contextTypes = BaseField.contextTypes;
SubmitField.defaultProps = { inputClassName: 'btn btn-primary' };

export default SubmitField;
