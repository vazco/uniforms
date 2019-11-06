import React from 'react';
import { BaseField, filterDOMProps, nothing } from 'uniforms';

const ErrorsField = ({ children, ...props }, { uniforms: { error, schema } }) =>
  !error && !children ? (
    nothing
  ) : (
    <div {...filterDOMProps(props)}>
      {children}

      <ul>
        {schema.getErrorMessages(error).map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
