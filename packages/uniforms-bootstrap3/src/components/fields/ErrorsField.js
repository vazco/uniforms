import React       from 'react';
import classnames  from 'classnames';
import {BaseField} from 'uniforms';

const ErrorsField = ({className, children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? null : (
        <section className={classnames(
          'panel panel-danger text-left',
          className,
          'error message'
        )} {...props}>
            <div className="panel-heading">
                {children}
                <ul className="list">
                    {schema.getErrorMessages(error).map((message, index) =>
                        <li key={index}>
                            {message}
                        </li>
                    )}
                </ul>
            </div>
        </section>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
