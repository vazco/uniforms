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

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
