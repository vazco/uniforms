import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps, Override } from 'uniforms';

export type ErrorFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    error?: boolean;
    errorMessage?: string;
  }
>;

const Error = ({
  children,
  className,
  error,
  errorMessage,
  ...props
}: ErrorFieldProps) =>
  !error ? null : (
    <div
      className={classnames('ui', className, 'error message')}
      {...filterDOMProps(props)}
    >
      {children ? children : <div className="header">{errorMessage}</div>}
    </div>
  );

export default connectField(Error, { initialValue: false });
