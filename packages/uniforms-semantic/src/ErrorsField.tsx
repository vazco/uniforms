import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import { filterDOMProps, useForm } from 'uniforms';

type ErrorsFieldProps = { name: string } & HTMLProps<HTMLDivElement>;

const ErrorsField = ({
  className,
  children,
  name,
  ...props
}: ErrorsFieldProps) => {
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
};

export default ErrorsField;
