import React, { useContext } from 'react';
import classnames from 'classnames';
import { context, filterDOMProps } from 'uniforms';

const ErrorsField = ({ className, children, ...props }) => {
  const { error, schema } = useContext(context).uniforms;

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
