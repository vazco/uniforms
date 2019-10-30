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
