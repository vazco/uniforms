import React       from 'react';
import {BaseField} from 'uniforms';

const ErrorsField = ({children, ...props}, {uniforms: {error, schema}}) =>
    !error ? null : (
        <section {...props}>
            {children}

            <ul className="list">
                {(!!error.reason && !(error.details || !error.details.map)) && (
                    <li>
                        {error.reason}
                    </li>
                )}

                {(!!error.details && error.details.map) && error.details.map(error =>
                    <li key={error.name}>
                        {schema.messageForError(error.type, error.name, null, error.details && error.details.value)}
                    </li>
                )}
            </ul>
        </section>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
