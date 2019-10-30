import React, { useContext } from 'react';
import classnames from 'classnames';
import context from 'uniforms/context';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing from 'uniforms/nothing';

const ErrorsField = ({ className, children, ...props }) => {
  const { error, schema } = useContext(context).uniforms;

  return !error && !children ? (
    nothing
  ) : (
    <div
      className={classnames('panel panel-danger', className)}
      {...filterDOMProps(props)}
    >
      <div className="panel-body">
        {children}

        {schema.getErrorMessages(error).map((message: any, index: number) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default ErrorsField;
