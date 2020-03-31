import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps } from 'uniforms';

export type ErrorFieldProps = {
  error?: boolean;
  errorMessage?: string;
} & HTMLProps<HTMLDivElement>;

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
