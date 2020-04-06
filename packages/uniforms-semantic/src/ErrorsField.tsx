import classnames from 'classnames';
import React, { HTMLProps } from 'react';
import { filterDOMProps, Override, useForm } from 'uniforms';

export type ErrorsFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  { name: string }
>;

function ErrorsField({
  children,
  className,
  name,
  ...props
}: ErrorsFieldProps) {
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
