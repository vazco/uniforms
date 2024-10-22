import React, { HTMLProps } from 'react';
import { filterDOMProps, useForm } from 'uniforms';

export type ErrorsFieldProps = HTMLProps<HTMLDivElement>;

const defaultStyle = {
  backgroundColor: 'rgba(255, 85, 0, 0.2)',
  border: '1px solid rgb(255, 85, 0)',
  borderRadius: '2px',
  margin: '20px 0px',
  padding: '10px',
};

const rowStyle = { margin: '3px' };

function ErrorsField({
  children,
  style = defaultStyle,
  ...props
}: ErrorsFieldProps) {
  const { error, schema } = useForm();

  return !error && !children ? null : (
    <div style={style} {...filterDOMProps(props)}>
      {children}
      <ul>
        {schema.getErrorMessages(error).map((message, index) => (
          <li key={index} style={rowStyle}>
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ErrorsField;
