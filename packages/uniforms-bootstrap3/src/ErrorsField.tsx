import React from 'react';
import classnames from 'classnames';
import { BaseField, filterDOMProps, nothing } from 'uniforms';

const ErrorsField = (
  { className, children, ...props }: any,
  { uniforms: { error, schema } },
) =>
  !error && !children ? (
    nothing
  ) : (
    <div
      className={classnames('panel panel-danger', className)}
      {...filterDOMProps(props)}
    >
      <div className="panel-body">
        {children}

        {schema.getErrorMessages(error).map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
