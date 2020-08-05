import React, { HTMLProps } from 'react';
import { filterDOMProps, useForm } from 'uniforms';

export type ErrorsFieldProps = HTMLProps<HTMLDivElement>;

const defaultProps = {
  style: {
    backgroundColor: 'rgba(255, 85, 0, 0.2)',
    border: '1px solid rgb(255, 85, 0)',
    borderRadius: '2px',
    margin: '20px 0px',
    padding: '10px',
  },
};

const messageRowStyle = { margin: '3px' };

function ErrorsField({
  children,
  style = defaultProps.style,
  ...props
}: ErrorsFieldProps) {
  const { error, schema } = useForm();

  return !error && !children ? null : (
    <div {...filterDOMProps({ style, ...props })}>
      {children}
      <ul>
        {schema.getErrorMessages(error).map((message, index) => (
          <li key={index} style={messageRowStyle}>
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ErrorsField;
