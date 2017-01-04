import BaseField  from 'uniforms/BaseField';
import nothing    from 'uniforms/nothing';
import React      from 'react';

const ErrorsField = ({className, children, ...props}, {uniforms: {error, schema}}) =>
    (!error && !children) ? nothing : (
        <section
            style={{
                border: '1px solid rgb(255, 85, 0)',
                margin: '20px 0px',
                borderRadius: '7px',
                padding: '10px',
                backgroundColor: 'rgba(255, 85, 0, 0.2)'
            }}
        >
            {children}
            <ul className={'list'} >
                {schema.getErrorMessages(error).map((message, index) =>
                    <li key={index} style={{margin: '3px'}}>
                        {message}
                    </li>
                )}
            </ul>
        </section>
    )
;

ErrorsField.contextTypes = BaseField.contextTypes;

export default ErrorsField;
