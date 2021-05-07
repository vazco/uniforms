import classnames from 'classnames';
import React, { HTMLProps } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

export type ErrorFieldProps = Override<
  Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
  { error?: any; errorMessage?: string }
>;

function Error({
  children,
  className,
  error,
  errorMessage,
  ...props
}: ErrorFieldProps) {
  return !error ? null : (
    <div
      className={classnames('panel panel-danger text-danger', className)}
      {...filterDOMProps(props)}
    >
      <div className="panel-body">
        {children ? (
          children
        ) : (
          <div className="panel-heading">
            <h4 className="panel-title">{errorMessage}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default connectField<ErrorFieldProps>(Error, {
  initialValue: false,
  kind: 'leaf',
});
