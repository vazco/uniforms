import BaseField from 'uniforms/BaseField';
import React from 'react';
import classnames from 'classnames';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing from 'uniforms/nothing';

const ErrorsField = ({className, children, ...props}, {uniforms: {error, schema}}) =>
  !error && !children ? (
    nothing
  ) : (
    <div className={classnames('ui', className, 'error message')} {...filterDOMProps(props)}>
      {children}

      <ul className="list">
        {schema.getErrorMessages(error).map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
