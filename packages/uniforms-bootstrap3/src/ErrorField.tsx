import React from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps } from 'uniforms';

const Error = ({ children, className, error, errorMessage, ...props }: any) =>
  !error ? null : (
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

export default connectField(Error, { initialValue: false });
