import React, { useContext } from 'react';
import { context, filterDOMProps, nothing } from 'uniforms';

function ErrorsField({ children, ...props }) {
  const { error, schema } = useContext(context).uniforms;

  return !error && !children ? (
    nothing
  ) : (
    <div {...filterDOMProps(props)}>
      {children}
      <ul>
        {schema.getErrorMessages(error).map((message: any, index: any) => (
          <li key={index} style={{ margin: '3px' }}>
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}

ErrorsField.defaultProps = {
  style: {
    backgroundColor: 'rgba(255, 85, 0, 0.2)',
    border: '1px solid rgb(255, 85, 0)',
    borderRadius: '7px',
    margin: '20px 0px',
    padding: '10px',
  },
};

export default ErrorsField;
