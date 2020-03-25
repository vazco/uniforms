import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps } from 'uniforms';

type ErrorFieldProps = { error?: any; errorMessage?: string } & HTMLProps<
  HTMLDivElement
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
      className={classnames('card', 'mb-3', className)}
      {...filterDOMProps(props)}
    >
      <div className="card-body">
        {children ? children : <h4 className="card-title">{errorMessage}</h4>}
      </div>
    </div>
  );

export default connectField(Error, { initialValue: false });
