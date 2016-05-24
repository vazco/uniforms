import React       from 'react';
import classnames  from 'classnames';
import {BaseField} from 'uniforms';

const ErrorsField = ({className, children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? null : (
        <section className={classnames(
          'card card-inverse card-danger text-xs-left',
          className,
          'error message'
        )} {...props}>
            <section className="card-block">
                <section className="card-text">
                    {children}
                    <ul className="list">
                        {schema.getErrorMessages(error).map((message, index) =>
                            <li key={index}>
                                {message}
                            </li>
                        )}
                    </ul>
                </section>
            </section>
        </section>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
