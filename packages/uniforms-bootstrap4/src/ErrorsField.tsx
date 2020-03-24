import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import { filterDOMProps, useForm } from 'uniforms';

type ErrorsFieldProps = {
  name: string;
} & HTMLProps<HTMLDivElement>;

const ErrorsField = ({
  className,
  name,
  children,
  ...props
}: ErrorsFieldProps) => {
  const { error, schema } = useForm();

  return !error && !children ? null : (
    <div
      className={classnames('card border-danger mb-3 text-danger', className)}
      {...filterDOMProps(props)}
    >
      <div className="card-body">
        {children}

        {schema.getErrorMessages(error).map((message, index) => (
          <div key={index} className="disabled">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorsField;
