import React from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps, nothing } from 'uniforms';

const Error = ({ children, className, error, errorMessage, ...props }) =>
  !error ? (
    nothing
  ) : (
    <div
      className={classnames('ui', className, 'error message')}
      {...filterDOMProps(props)}
    >
      {children ? children : <div className="header">{errorMessage}</div>}
    </div>
  );

export default connectField(Error, { initialValue: false });
