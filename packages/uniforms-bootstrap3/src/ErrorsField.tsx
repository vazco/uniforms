import React from 'react';
import classnames from 'classnames';
import { filterDOMProps, useField } from 'uniforms';

const ErrorsField = ({ className, children, ...props }: any) => {
  const { error, schema } = useField(name, props)[1];

  return !error && !children ? null : (
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
};

export default ErrorsField;
