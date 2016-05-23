import React       from 'react';
import {BaseField} from 'uniforms';

const ErrorsField = ({children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? null : (
        <section {...props}>
            {children}

            <ul>
                {schema.getErrorMessages(error).map((message, index) =>
                    <li key={index}>
                        {message}
                    </li>
                )}
            </ul>
        </section>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
