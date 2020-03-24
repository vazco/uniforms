import React, { HTMLProps } from 'react';
import { filterDOMProps, useForm } from 'uniforms';

type ErrorsFieldProps = HTMLProps<HTMLDivElement>;

function ErrorsField({ children, ...props }: ErrorsFieldProps) {
  const { error, schema } = useForm();

  return !error && !children ? null : (
    <div {...filterDOMProps(props)}>
      {children}
      <ul>
        {schema.getErrorMessages(error).map((message, index) => (
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
