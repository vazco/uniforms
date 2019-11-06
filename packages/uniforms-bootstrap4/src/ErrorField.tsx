import React from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps, nothing } from 'uniforms';

const Error = ({ children, className, error, errorMessage, ...props }) =>
  !error ? (
    nothing
  ) : (
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
