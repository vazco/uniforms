import React, { useContext } from 'react';
import { context, filterDOMProps } from 'uniforms';

function ErrorsField({ children, ...props }) {
  const { error, schema } = useContext(context).uniforms;

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
