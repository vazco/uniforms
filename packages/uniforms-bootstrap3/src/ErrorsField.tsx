import classnames from 'classnames';
import React, { HTMLProps } from 'react';
import { filterDOMProps, useForm } from 'uniforms';

import wrapField from './wrapField';

export type ErrorsFieldProps = HTMLProps<HTMLDivElement>;

function ErrorsField({ className, children, ...props }: ErrorsFieldProps) {
  const { error, schema } = useForm();

  return !error && !children ? null : (
    <div
      className={classnames('panel panel-danger', className)}
      {...wrapField.__filterProps(filterDOMProps(props))}
    >
      <div className="panel-body">
        {children}

        {schema.getErrorMessages(error).map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
}

export default ErrorsField;
