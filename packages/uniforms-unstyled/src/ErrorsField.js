import React            from 'react';
import {BaseField}      from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {nothing}        from 'uniforms';

const ErrorsField = ({children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? nothing : (
        <section {...filterDOMProps(props)}>
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
