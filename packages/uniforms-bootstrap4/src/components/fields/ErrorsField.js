import React       from 'react';
import classnames  from 'classnames';
import {BaseField} from 'uniforms';

const ErrorsField = ({className, children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? null : (
        <section className={classnames('card', className)}>
            <section className="card-block">
                {children}

                {schema.getErrorMessages(error).map((message, index) =>
                    <section key={index} className="disabled">
                        {message}
                    </section>
                )}
            </section>
        </section>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
