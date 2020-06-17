import classnames from 'classnames';
import React, { HTMLProps } from 'react';
import { filterDOMProps, useForm } from 'uniforms';

export type ErrorsFieldProps = HTMLProps<HTMLDivElement>;

function ErrorsField({ children, className, ...props }: ErrorsFieldProps) {
  const { error, schema } = useForm();

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
}

export default ErrorsField;
