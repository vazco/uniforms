import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import { filterDOMProps, useForm } from 'uniforms';

type ErrorsFieldProps = HTMLProps<HTMLDivElement>;

const ErrorsField = ({ className, children, ...props }: ErrorsFieldProps) => {
  const { error, schema } = useForm();

  return !error && !children ? null : (
    <div
      className={classnames('panel panel-danger', className)}
      {...filterDOMProps(props)}
    >
      <div className="panel-body">
        {children}

        {schema.getErrorMessages(error).map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default ErrorsField;
