import classnames from 'classnames';
import React, { HTMLProps, Ref } from 'react';
import { filterDOMProps, Override, useForm } from 'uniforms';

import gridClassName from './gridClassName';

export type SubmitFieldProps = Override<
  HTMLProps<HTMLInputElement>,
  {
    inputClassName?: string;
    inputRef?: Ref<HTMLInputElement>;
    wrapClassName?: string;
  }
>;

function SubmitField({
  className,
  disabled,
  inputClassName,
  inputRef,
  readOnly,
  value,
  wrapClassName,
  ...props
}: SubmitFieldProps) {
  const { error, state: anyState } = useForm();
  const state = anyState as unknown as { disabled: boolean; grid: any };
  const hasWrap = !!(state.grid || wrapClassName);

  const blockInput = (
    <input
      className={inputClassName}
      disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
      readOnly={readOnly}
      ref={inputRef}
      type="submit"
      {...(value ? { value } : {})}
    />
  );

  return (
    <div
      className={classnames(className, {
        'is-invalid': error,
        row: state.grid,
      })}
      {...filterDOMProps(props)}
    >
      {hasWrap && (
        <span
          className={classnames(
            'col-form-label',
            gridClassName(state.grid, 'label'),
          )}
        >
          &nbsp;
        </span>
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
}

SubmitField.defaultProps = { inputClassName: 'btn btn-primary' };

export default SubmitField;
