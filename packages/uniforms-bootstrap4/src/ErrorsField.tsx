import React from 'react';
import classnames from 'classnames';
import { filterDOMProps, useField } from 'uniforms';

const ErrorsField = ({ className, name, children, ...props }: any) => {
  const { error, schema } = useField(name, props)[1];

  return !error && !children ? null : (
    <div
      className={classnames('card border-danger mb-3 text-danger', className)}
      {...filterDOMProps(props)}
    >
      <div className="card-body">
        {children}

        {schema.getErrorMessages(error).map((message, index) => (
          <div key={index} className="disabled">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorsField;
