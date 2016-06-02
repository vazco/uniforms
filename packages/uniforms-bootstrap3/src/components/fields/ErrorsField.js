import React       from 'react';
import classnames  from 'classnames';
import {BaseField} from 'uniforms';

const ErrorsField = ({className, children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? null : (
        <section className={classnames('panel panel-default', className)}>
            <section className="panel-body">
                {children}

                <ul className="list-group">
                    {schema.getErrorMessages(error).map((message, index) =>
                        <li key={index} className="disabled">
                            {message}
                        </li>
                    )}
                </ul>
            </section>
        </section>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
