import classnames from 'classnames';
import React, { HTMLProps } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

import wrapField from './wrapField';

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
      className={classnames('card', 'mb-3', className)}
      {...wrapField.__filterProps(filterDOMProps(props))}
    >
      <div className="card-body">
        {children ? children : <h4 className="card-title">{errorMessage}</h4>}
      </div>
    </div>
  );
}

export default connectField(Error, { initialValue: false, kind: 'leaf' });
