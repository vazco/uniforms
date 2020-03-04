import React from 'react';
import { filterDOMProps, useField } from 'uniforms';

function ErrorsField({ children, name, ...props }: any) {
  const { error, schema } = useField(name, props)[1];

  return !error && !children ? null : (
    <div {...filterDOMProps(props)}>
      {children}

      <ul>
        {schema.getErrorMessages(error).map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default ErrorsField;
