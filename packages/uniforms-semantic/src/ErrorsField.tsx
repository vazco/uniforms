import React from 'react';
import classnames from 'classnames';
import { filterDOMProps, useField } from 'uniforms';

const ErrorsField = ({ className, children, ...props }: any) => {
  const { error, schema } = useField(props.name, props)[1];

  return !error && !children ? null : (
    <div
      className={classnames('ui', className, 'error message')}
      {...filterDOMProps(props)}
    >
      {children}

      <ul className="list">
        {schema.getErrorMessages(error).map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorsField;
