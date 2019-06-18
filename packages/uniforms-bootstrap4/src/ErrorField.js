import React from 'react';
import classnames from 'classnames';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing from 'uniforms/nothing';

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
